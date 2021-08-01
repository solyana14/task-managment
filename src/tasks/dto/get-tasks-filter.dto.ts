import { TaskStatus } from "../task-status";

export class GetTasksFilterDto {
    status?: TaskStatus
    search?: string
}