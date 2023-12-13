import { WorkTime } from "../models/workTime.model";

export const MOCK_WORK_TIME: WorkTime[] = [
    {
        date: 1701338157477,
        finished:1701341700000,
        started: 1701338157477,
        sick_leave: true,
        vacation: false,
        work_time: 1,
    },
    {
        date: 1701338157477,
        finished:1701341700000,
        started: 1701338157477,
        sick_leave: false,
        vacation: true,
        work_time: 4,
      },
      {
        date: 1701338157477,
        finished:1701341700000,
        started: 1701338157477,
        sick_leave: true,
        vacation: false,
        work_time: 4,
      }

];