import { Injectable } from "@angular/core";
import { Country } from "../models/Country";
import { PieData } from "../models/PieData";
import { LineData } from "../models/LineData";
import { Participation } from "../models/Participation";
import { Legend } from "../models/Legend";


@Injectable({
    providedIn: 'root',
})

export class ChartsService {

    /**
     * Returns legend data for the home chart (pie chart)
     * 
     * @param countries  - An array of all Countries
     * @returns Countries data as Legend
     */
    getHomeChartLegendData(countries: Country[]): Legend{
        const uniqueParticipations = new Set(
            countries.flatMap(country => country.participations)
            .map(participation => `${participation.year}-${participation.city}`)
        );
        const countryCount = countries.length;
        return {
            title: 'Medals per Country',
            cards: [
                {
                    label: 'Number of JOs',
                    value: uniqueParticipations.size
                },
                {
                    label: 'Number of countries',
                    value: countryCount
                },
            ]
        }
    }
    /**
     * Returns an array of PieData from countries to be consumed by ngx-chart PieChart component
     * 
     * @param countries  - An array of all Countries
     * @returns Countries data as an array of PieData
     */
    getPieData(countries: Country[]): PieData[]{
        return countries.map( data => {
            const totalMedal = this.getTotalMedalsCount(data.participations)
            return {
                name: data.country,
                value: totalMedal,
                extra: {
                    id: data.id,
                }
            }
        })
    }

    /**
     * Returns legend data for the detail chart (line chart)
     * 
     * @param country  - A Country
     * @returns Country data as Legend
     */
    getDetailChartLegendData(country: Country): Legend{
        return {
            title: country.country,
            cards: [
                {
                    label: 'Number of entries',
                    value: country.participations.length,
                },
                {
                    label: 'Total number medals',
                    value: this.getTotalMedalsCount(country.participations)
                },
                {
                    label: 'Total number of athletes',
                    value: this.getTotalAthletesCount(country.participations)
                },
            ]
        }
    }

    /**
     * Returns an array of LineData from participations to be consumed by ngx-chart LineChart component
     * 
     * @param participations  - An array a country's Participations
     * @returns Participations data as an array of LineData
     */
    getLineData(participations: Participation[]): LineData[]{
        const series = participations.map(participation => {
            return {
                value: participation.medalsCount,
                name: `${participation.year}`
            }
        })
      
        const data = [{
            name: 'Medals',
            series: series,
        }]
        return data
    }

    /**
     * Returns the total medals count of a country
     * 
     * @param participations  - An array a country's Participations
     * @returns The addition of each participation's medalsCount
     */
    private getTotalMedalsCount(participations: Participation[]): number {
        return participations.reduce((total, participation) => total + participation.medalsCount, 0)
    }

    /**
     * Returns the total athlete count of a country
     * 
     * @param participations  - An array a country's Participations
     * @returns The addition of each participation's athleteCount
     */
    private getTotalAthletesCount(participations: Participation[]): number {
        return participations.reduce((total, participation) => total + participation.athleteCount, 0)
    }
}