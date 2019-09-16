import {PipeTransform, BadRequestException} from "@nestjs/common";
import {TaskStatus} from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
    ]
    transform(value : TaskStatus){
        value = value.toUpperCase() as TaskStatus;
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value} is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: TaskStatus){
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}