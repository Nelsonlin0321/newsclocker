import { getUTCNextRunTime } from "@/lib/utils";
import moment from "moment-timezone";

describe("getUTCNextRunTime", () => {
  it("returns the correct UTC time for today if the time to send is in the future", () => {
    // Mock current time to be a specific time in Los Angeles
    jest
      .spyOn(moment, "tz")
      .mockReturnValueOnce(
        moment.tz("2024-03-10 10:00:00", "America/Los_Angeles")
      );

    const timezone = "America/Los_Angeles";
    const timeToSend = "14:00"; // 2 PM

    const expectedUTC = new Date("2024-03-10T21:00:00.000Z"); // Expected UTC time
    const actualUTC = getUTCNextRunTime(timezone, timeToSend);

    expect(actualUTC.toISOString()).toBe(expectedUTC.toISOString());
  });

  it("returns the correct UTC time for tomorrow if the time to send is in the past", () => {
    jest
      .spyOn(moment, "tz")
      .mockReturnValueOnce(
        moment.tz("2024-03-10 10:00:00", "America/Los_Angeles")
      );

    const timezone = "America/Los_Angeles";
    const timeToSend = "08:00"; // 8 AM (past)

    const expectedUTC = new Date("2024-03-11T15:00:00.000Z"); // Expected UTC time (tomorrow)
    const actualUTC = getUTCNextRunTime(timezone, timeToSend);

    expect(actualUTC.toISOString()).toBe(expectedUTC.toISOString());
  });

  // Add more test cases for different scenarios and edge cases
});
