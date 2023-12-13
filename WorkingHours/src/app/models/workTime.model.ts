export interface WorkTime {
    id?: number;
    date: number;
    started: number;
    finished: number;
    work_time: number;
    sick_leave: boolean;
    vacation: boolean;
}

export interface WorkTimeSum {
    sum_sick_leave: number;
    sum_vacation: number;
    sum_work_time: number;
}