"use client";

import { BorderCountry } from "@/interfaces/countries.interface";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
    borderCountries: BorderCountry[];
};

const BorderCountriesWidget: FC<Props> = ({ borderCountries }) => {
    const router = useRouter();

    const handleCountryClick = (countryCode: string) => {
        router.push(`/${countryCode}`);
    };

    return (
        <Card className="p-4 mb-6">
            <h3 className="text-lg font-bold mb-4">Border Countries</h3>
            {borderCountries.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {borderCountries.map((country) => (
                        <Button
                            key={country.countryCode}
                            onClick={() => handleCountryClick(country.countryCode)}
                            className="text-blue-600 hover:underline"
                        >
                            {country.commonName}
                        </Button>
                    ))}
                </div>
            ) : (
                <p>No border countries available.</p>
            )}
        </Card>
    );
};

export default BorderCountriesWidget;
