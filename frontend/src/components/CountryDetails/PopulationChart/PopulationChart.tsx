"use client";

import { FC } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "@nextui-org/react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { PopulationCount } from "@/interfaces/countries.interface";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

type Props = {
    populationData: PopulationCount[];
};

const PopulationChart: FC<Props> = ({ populationData }) => {
    const data = {
        labels: populationData.map((data) => data.year),
        datasets: [
            {
                label: "Population",
                data: populationData.map((data) => data.value),
                fill: false,
                borderColor: "rgb(56, 145, 246)",
                tension: 0.1,
            },
        ],
    };

    return (
        <Card className="p-4 mb-6">
            <h3 className="text-lg font-bold mb-4">Population Over Time</h3>
            <Line data={data} />
        </Card>
    );
};

export default PopulationChart;
