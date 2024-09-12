"use client";

import { AvailableCountry } from "@/interfaces/countries.interface";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type Props = {
    countries?: AvailableCountry[] | undefined;
}

const CountryList: FC<Props> = ({ countries }) => {
    const router = useRouter();

    const handleCountryClick = (countryCode: string) => {
        router.push(`/${countryCode}`);
    };

    return (
        <React.Fragment>
            <main className="p-4 bg-backgroundLight min-h-screen">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-logoBlue">
                    Country List
                </h1>
                <div className="overflow-x-auto">
                    <Table
                        aria-label="Countries Table"
                        selectionMode="single"
                        shadow={'md'}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <TableHeader>
                            <TableColumn className="text-lg md:text-xl text-darkGray">
                                Country Name
                            </TableColumn>
                            <TableColumn className="text-lg md:text-xl text-textDark">
                                Country Code
                            </TableColumn>
                            <TableColumn className="text-lg md:text-xl text-primary">
                                Action
                            </TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No countries to display."}>
                            {countries && countries?.length > 0
                                ? countries?.map((country) => (
                                    <TableRow key={country.countryCode}>
                                        <TableCell className="text-base md:text-lg text-darkGray font-semibold">
                                            {country.name}
                                        </TableCell>
                                        <TableCell className="text-base md:text-lg text-textDark">
                                            {country.countryCode}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                color="primary"
                                                onClick={() => handleCountryClick(country.countryCode)}
                                                className="text-sm md:text-base bg-primary hover:bg-primaryDark text-white rounded-md"
                                            >
                                                View Info
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : []}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </React.Fragment>
    );
}

export default CountryList;