"use client";

import { CountryDetails } from "@/interfaces/countries.interface";
import React, { FC } from "react";
import { Avatar, Card } from "@nextui-org/react";
import BorderCountriesWidget from "./BorderCountriesWidget/BorderCountriesWidget";
import PopulationChart from "./PopulationChart/PopulationChart";

type Props = {
    countryDetails: CountryDetails
}

const CountryInfo: FC<Props> = ({ countryDetails }) => {

    return <React.Fragment>
        <main className="p-6">
            <Card className="p-4 mb-6">
                <div className="flex items-center space-x-4">
                    <Avatar src={countryDetails.flagUrl} alt={`${countryDetails?.countryInfo?.officialName} flag`} />
                    <h1 className="text-3xl font-bold">
                        {countryDetails?.countryInfo?.officialName}
                    </h1>
                </div>
            </Card>
            <BorderCountriesWidget borderCountries={countryDetails?.countryInfo?.borders} />
            <PopulationChart populationData={countryDetails?.populationData} />
        </main>
    </React.Fragment>;
}

export default CountryInfo;