import { IsNumber } from 'class-validator';

/**
 * Data transfer object representing the points information.
 * This class is used to encapsulate the total number of points associated with a particular entity.
 */
export class PointsDto {
  /**
   * The total number of points.
   * This property holds the numeric value representing the accumulated points.
   * @type {number}
   */
  @IsNumber({}, { message: 'Points must be a valid number.' })
  points: number;
}
