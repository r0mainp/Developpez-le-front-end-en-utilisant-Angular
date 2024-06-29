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

    getPieChartLegendData(countries: Country[]): Legend{
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
            const totalMedal = data.participations.reduce((total, participation) => total + participation.medalsCount, 0)
            return {
                name: data.country,
                value: totalMedal,
                extra: {
                    id: data.id,
                }
            }
        })
    }

    getLineData(participations: Participation[]): LineData[]{
        const series = participations.map(participation => {
            return {
                value: participation.medalsCount,
                name: `${participation.city} - ${participation.year}`
            }
        })
      
        const data = [{
            name: 'Medals',
            series: series
        }]
        return data
    }
}