import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const LotacaoGauge = () => {
  const [percentage, setPercentage] = useState(0);

  const atualizarLotacao = () => {
    const lotacaoSalva = localStorage.getItem("lotacao");
    if (lotacaoSalva) {
      setPercentage(parseInt(lotacaoSalva, 10) || 0);
    }
  };

  useEffect(() => {
    atualizarLotacao();

    // Escuta mudanças no evento personalizado e no localStorage
    window.addEventListener("lotacaoAtualizada", atualizarLotacao);
    window.addEventListener("storage", atualizarLotacao);

    return () => {
      window.removeEventListener("lotacaoAtualizada", atualizarLotacao);
      window.removeEventListener("storage", atualizarLotacao);
    };
  }, []);

  const data = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  const COLORS = ["#2196F3", "#E3F2FD"];

  return (
    <div className="gauge-container">
      <PieChart width={300} height={150}>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={70}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <p><strong>Lotação Atual: {percentage}%</strong></p>
    </div>
  );
};

export default LotacaoGauge;
