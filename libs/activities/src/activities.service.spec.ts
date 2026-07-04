import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let prisma: any;
  let googleCalendarService: any;

  beforeEach(() => {
    prisma = {
      activity: { create: jest.fn(), findFirst: jest.fn(), update: jest.fn(), delete: jest.fn() },
      reminder: { create: jest.fn(), findFirst: jest.fn(), update: jest.fn(), deleteMany: jest.fn() },
    };
    googleCalendarService = { syncActivity: jest.fn() };
    service = new ActivitiesService(prisma, googleCalendarService);
  });

  describe('create', () => {
    it('does not create a reminder when reminderMinutesBefore is not provided', async () => {
      prisma.activity.create.mockResolvedValue({ id: 'act-1', type: 'task', dueDate: new Date() });

      await service.create({ type: 'task', subject: 'x', dueDate: '2026-07-01T10:00:00.000Z' } as any, 'user-1', 'tenant-1');

      expect(prisma.reminder.create).not.toHaveBeenCalled();
    });

    it('does not create a reminder when there is no dueDate', async () => {
      prisma.activity.create.mockResolvedValue({ id: 'act-1', type: 'note', dueDate: null });

      await service.create({ type: 'note', subject: 'x', reminderMinutesBefore: 15 } as any, 'user-1', 'tenant-1');

      expect(prisma.reminder.create).not.toHaveBeenCalled();
    });

    it('creates a reminder tied to the activity and the owner when dueDate and reminderMinutesBefore are set', async () => {
      prisma.activity.create.mockResolvedValue({ id: 'act-1', type: 'task', dueDate: new Date('2026-07-01T10:00:00.000Z') });

      await service.create(
        { type: 'task', subject: 'x', dueDate: '2026-07-01T10:00:00.000Z', reminderMinutesBefore: 30 } as any,
        'user-1',
        'tenant-1',
      );

      expect(prisma.reminder.create).toHaveBeenCalledWith({
        data: { activityId: 'act-1', userId: 'user-1', minutesBefore: 30 },
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      prisma.activity.findFirst.mockResolvedValue({ id: 'act-1', tenantId: 'tenant-1' });
      prisma.activity.update.mockResolvedValue({ id: 'act-1', type: 'task' });
    });

    it('removes the reminder when reminderMinutesBefore is explicitly null', async () => {
      await service.update('act-1', { reminderMinutesBefore: null } as any, 'tenant-1', 'user-1');

      expect(prisma.reminder.deleteMany).toHaveBeenCalledWith({ where: { activityId: 'act-1', userId: 'user-1' } });
    });

    it('creates a reminder when none existed yet', async () => {
      prisma.reminder.findFirst.mockResolvedValue(null);

      await service.update('act-1', { reminderMinutesBefore: 60 } as any, 'tenant-1', 'user-1');

      expect(prisma.reminder.create).toHaveBeenCalledWith({
        data: { activityId: 'act-1', userId: 'user-1', minutesBefore: 60 },
      });
    });

    it('updates an existing reminder and resets sent to false', async () => {
      prisma.reminder.findFirst.mockResolvedValue({ id: 'rem-1' });

      await service.update('act-1', { reminderMinutesBefore: 5 } as any, 'tenant-1', 'user-1');

      expect(prisma.reminder.update).toHaveBeenCalledWith({
        where: { id: 'rem-1' },
        data: { minutesBefore: 5, sent: false },
      });
    });

    it('does not touch reminders when reminderMinutesBefore is not part of the update', async () => {
      await service.update('act-1', { subject: 'renamed' } as any, 'tenant-1', 'user-1');

      expect(prisma.reminder.create).not.toHaveBeenCalled();
      expect(prisma.reminder.update).not.toHaveBeenCalled();
      expect(prisma.reminder.deleteMany).not.toHaveBeenCalled();
    });
  });
});
