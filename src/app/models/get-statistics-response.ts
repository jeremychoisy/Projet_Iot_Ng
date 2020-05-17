export interface GetStatisticsResponse {
  totalCount: number;
  statistics: {[zoneNb: string]: number};
}
