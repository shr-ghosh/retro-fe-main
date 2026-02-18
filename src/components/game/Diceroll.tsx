import React, { useState, useCallback } from "react";
import MagneticSlider from "../MagnetSlider";
import Input from "@/components/basic/Input";

interface DicerollProps {
  value: number;
  onChange: (chance: number) => void;
}

const Diceroll: React.FC<DicerollProps> = ({
  value: initialChance = 50.0,
  onChange,
}) => {
  const [chance, setChance] = useState(initialChance);

  const calculateValues = useCallback((newChance: number) => {
    const winChance = Number(newChance.toFixed(2));
    const rollOver = Number((100 - winChance).toFixed(2));
    const multiplier = Number((100 / rollOver).toFixed(2));
    return { winChance, rollOver, multiplier };
  }, []);

  const { winChance, rollOver, multiplier } = calculateValues(chance);

  const handleChange = useCallback(
    (index: number, newValue: number) => {
      let newChance: number;
      switch (index) {
        case 0: // Win Chance
          newChance = newValue;
          break;
        case 1: // Roll Over
          newChance = 100 - newValue;
          break;
        case 2: // Multiplier
          newChance = 100 - 100 / newValue;
          break;
        default:
          return;
      }
      setChance(newChance);
      onChange(newChance);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-8 dice-game">
      <MagneticSlider
        initialValue={rollOver}
        step={1}
        min={0}
        max={100}
        onChange={(val) => handleChange(1, val)}
      />
      <div className="grid md:grid-cols-3 gap-2">
        {[
          { label: "Win Chance", value: winChance },
          { label: "Roll Over", value: rollOver },
          { label: "Multiplier", value: multiplier },
        ].map(({ label, value }, index) => (
          <Input
            type="number"
            label={label}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, Number(e.target.value))
            }
            className="p-1 border rounded-sm"
            key={label}
          />
        ))}
      </div>
    </div>
  );
};

export default Diceroll;
