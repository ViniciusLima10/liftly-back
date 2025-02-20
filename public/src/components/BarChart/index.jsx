import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { dia: "Seg", lotacao: 30 },
    { dia: "Ter", lotacao: 50 },
    { dia: "Qua", lotacao: 60 },
    { dia: "Qui", lotacao: 70 },
    { dia: "Sex", lotacao: 80 },
    { dia: "Sab", lotacao: 50 },
    { dia: "Dom", lotacao: 40 }
];

const LotacaoBarChart = () => {
    return (
        <div className="chart-container">
            <ResponsiveContainer width="120%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="lotacao" fill="#2196F3" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LotacaoBarChart;

