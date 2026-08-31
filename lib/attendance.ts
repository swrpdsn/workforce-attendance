import { AttendanceStatus } from '@prisma/client';

export type AttendanceInput = {
  checkIn?: Date | null;
  checkOut?: Date | null;
  shiftStart?: Date | null;
  shiftEnd?: Date | null;
  graceMinutes?: number;
  minimumHoursForHalfDay?: number;
  minimumHoursForFullDay?: number;
  weeklyOff?: boolean;
  holiday?: boolean;
  paidLeave?: boolean;
};

export function calculateAttendance(input: AttendanceInput) {
  if (input.weeklyOff) return { status: AttendanceStatus.WEEKLY_OFF, workedHours: 0, lateMinutes: 0, earlyExitMinutes: 0, overtimeHours: 0, payableDayValue: 1, lopDayValue: 0 };
  if (input.holiday) return { status: AttendanceStatus.HOLIDAY, workedHours: 0, lateMinutes: 0, earlyExitMinutes: 0, overtimeHours: 0, payableDayValue: 1, lopDayValue: 0 };
  if (input.paidLeave) return { status: AttendanceStatus.PAID_LEAVE, workedHours: 0, lateMinutes: 0, earlyExitMinutes: 0, overtimeHours: 0, payableDayValue: 1, lopDayValue: 0 };
  if (!input.checkIn) return { status: AttendanceStatus.ABSENT, workedHours: 0, lateMinutes: 0, earlyExitMinutes: 0, overtimeHours: 0, payableDayValue: 0, lopDayValue: 1 };

  const checkOut = input.checkOut ?? null;
  const workedHours = checkOut ? Math.max(0, (checkOut.getTime() - input.checkIn.getTime()) / 3_600_000) : 0;
  const grace = input.graceMinutes ?? 0;
  const lateMinutes = input.shiftStart ? Math.max(0, Math.floor((input.checkIn.getTime() - input.shiftStart.getTime()) / 60_000) - grace) : 0;
  const earlyExitMinutes = input.shiftEnd && checkOut ? Math.max(0, Math.floor((input.shiftEnd.getTime() - checkOut.getTime()) / 60_000)) : 0;
  const full = input.minimumHoursForFullDay ?? 8;
  const half = input.minimumHoursForHalfDay ?? 4;
  const payableDayValue = workedHours >= full ? 1 : workedHours >= half ? 0.5 : 0;
  const status = !checkOut ? AttendanceStatus.MISSING_PUNCH : payableDayValue === 1 ? (lateMinutes > 0 ? AttendanceStatus.LATE : AttendanceStatus.PRESENT) : payableDayValue === 0.5 ? AttendanceStatus.HALF_DAY : AttendanceStatus.ABSENT;
  const overtimeHours = input.shiftEnd && checkOut ? Math.max(0, (checkOut.getTime() - input.shiftEnd.getTime()) / 3_600_000) : 0;
  return { status, workedHours, lateMinutes, earlyExitMinutes, overtimeHours, payableDayValue, lopDayValue: Math.max(0, 1 - payableDayValue) };
}
