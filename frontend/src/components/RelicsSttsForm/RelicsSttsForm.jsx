import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import BtnInputText from "../Filters/BtnInputText/BtnInputText";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export default function RelicsSttsForm({}) {
  return (
    <div className="relic-form">
      <h4>Main Stat</h4>

      <div className="stat-row">
        <Dropdown />
        <InputNumber />
      </div>

      <h4>Substats</h4>

      <div className="stat-row">
        <Dropdown />
        <InputNumber />
      </div>

      <div className="stat-row">
        <Dropdown />
        <InputNumber />
      </div>

      <div className="stat-row">
        <Dropdown />
        <InputNumber />
      </div>

      <div className="stat-row">
        <Dropdown />
        <InputNumber />
      </div>
    </div>
  );
}
