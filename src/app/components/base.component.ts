import { Component, ReflectiveInjector } from '@angular/core';
import { MonitoringService } from '../services/monitoring.service';

@Component({
    template: ''
})
export class BaseComponent {

    private myMonitoringService: MonitoringService; 

    constructor() {
		// Manually retrieve the monitoring service from the injector 
		// so that constructor has no dependencies that must be passed in from child 
        const injector = ReflectiveInjector.resolveAndCreate([
            MonitoringService
        ]); 
        this.myMonitoringService = injector.get(MonitoringService);
        this.logNavigation();
    }

    private logNavigation() { 
        this.myMonitoringService.logPageView();
    }
}