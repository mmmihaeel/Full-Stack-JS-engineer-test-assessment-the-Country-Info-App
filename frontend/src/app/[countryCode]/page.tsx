import CountryInfo from "@/components/CountryDetails/CountryDetails";
import { Api } from "@/services";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type MetadataProps = {
    params: { countryCode: string };
};

export async function generateMetadata({
    params,
}: MetadataProps): Promise<Metadata> {
    const countryDetails = await Api().countries.getCountryDetails(params?.countryCode)

    return {
        title: countryDetails.countryInfo.officialName,
        description:
            String(countryDetails.countryInfo.commonName),
        keywords: String(
            String(countryDetails.countryInfo.officialName) +
            ' ' +
            String(countryDetails.countryInfo.commonName) +
            ' ' +
            String(countryDetails.countryInfo.countryCode) +
            ' ' +
            String(countryDetails.countryInfo.region)
        )
            .replaceAll(',', '')
            .split(' ')
            .join(','),
        referrer: 'strict-origin-when-cross-origin',
        robots: 'index, follow',
        openGraph: {
            type: 'website',
            url: countryDetails.flagUrl,
            title: countryDetails.countryInfo.officialName,
            description:
                String(countryDetails.countryInfo.commonName),
            images: [{
                url: countryDetails.flagUrl,
            }]
            ,
        },
        twitter: {
            card: 'summary_large_image',
            images: countryDetails.flagUrl,
        },
    };
}

export async function generateStaticParams() {
    const countries = await Api().countries.getCountries();

    return countries.map((country) => {
        return {
            countryCode: country?.countryCode
        }
    })
}

export const revalidate = 360;

export const dynamicParams = true;

type PageProps = {
    params: { countryCode: string };
};

const CountryInfoPage = async ({ params: { countryCode } }: PageProps) => {

    try {
        const countryDetails = await Api().countries.getCountryDetails(countryCode);

        return (
            <CountryInfo countryDetails={countryDetails} />
        );
    } catch (err) {
        notFound();
    }
};

export default CountryInfoPage;