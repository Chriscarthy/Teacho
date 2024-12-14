import { Application } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';

// Initialize local notifications
LocalNotifications.init();

Application.run({ moduleName: 'app-root' });