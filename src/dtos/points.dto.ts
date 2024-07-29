import { IsNumber } from 'class-validator';

/**
 * Data transfer object representing the points information.
 */
export class PointsDto {
  /**
   * The total number of points.
   * @type {number}
   */
  @IsNumber()
  points: number;
}
