import { AdminWelcomePageModule } from './admin-welcome-page.module';

describe('AdminWelcomePageModule', () => {
  let adminWelcomePageModule: AdminWelcomePageModule;

  beforeEach(() => {
    adminWelcomePageModule = new AdminWelcomePageModule();
  });

  it('should create an instance', () => {
    expect(adminWelcomePageModule).toBeTruthy();
  });
});
