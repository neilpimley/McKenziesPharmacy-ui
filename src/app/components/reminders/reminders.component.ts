import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { RemindersService } from '../../services/reminders.service';

@Component({
  selector: 'reminders',
  templateUrl: './reminders.component.html'
})
export class RemindersComponent extends BaseComponent implements OnInit {
    public reminders: any[];
    header: any;
    event: any;
    dialogVisible: boolean = false;
    idGen: number = 100;

    constructor(private remindersService: RemindersService, private cd: ChangeDetectorRef) {
        super();
     }

    ngOnInit() {
       /* this.remindersService.getReminders()
            .subscribe((reminders) => {
                this.reminders = reminders;
            });*/

        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }


    handleDayClick(event) {
        this.event = {};
        this.event.start = event.date.format();
        this.dialogVisible = true;

        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }

    handleEventClick(e) {
        this.event = {};
        this.event.title = e.calEvent.title;

        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        if (this.event.id) {
            // update
            const index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.reminders[index] = this.event;
            }
        } else {
            // new
            this.event.id = this.idGen++;
            this.reminders.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        const index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.reminders.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.reminders.length; i++) {
            if (id === this.reminders[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }

    
}
