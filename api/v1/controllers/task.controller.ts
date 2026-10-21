import { Request, Response } from "express";

import Task from "../models/task.model";

import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";


export const index = async (req: Request, res: Response) => {
  // Find
  interface Find {
    deleted: boolean,
    status?: string,
    title?: RegExp
  }
  
  const find: Find = {
    deleted: false,
  }

  if(req.query.status) {
    find.status = req.query.status.toString();
  }
  // End Find

  // Search 
  let objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  // End Search


  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2
  };

  const countTasks = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTasks
  );
  // End Pagination

  //Sort
  const sort = {};

  if(req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue;
  }
  // End Sort

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });

  res.json(task);
};

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (typeof id !== "string") {
    return res.status(400).json({
      code: 400,
      message: "ID không hợp lệ."
    });
  }

  try {
    const status: string = req.body.status;

    await Task.updateOne({_id: id}, {status: status});
    res.json({
      code: 200,
      message: "Cập nhật thành công."
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại."
    });
  }

};

// [PATCH] /api/v1/tasks/change-multi/:id
export const changeMulti = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;

    // console.log(ids);
    // console.log(key);
    // console.log(value);

    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids}
          }, 
          {
            status: value
          });
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!"
        });
        break;
      default:
        break;
    }

      
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }

};