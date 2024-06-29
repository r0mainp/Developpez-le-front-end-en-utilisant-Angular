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

    private getTotalMedalsCount(participations: Participation[]): number {
        return participations.reduce((total, participation) => total + participation.medalsCount, 0)
    }
    private getTotalAthletesCount(participations: Participation[]): number {
        return participations.reduce((total, participation) => total + participation.athleteCount, 0)
    }
}