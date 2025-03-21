"use client"; 

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plantList = [
  { name: "Aloe Vera", water: "Every 2 weeks", light: "Bright, indirect light" },
  { name: "Snake Plant", water: "Every 3 weeks", light: "Low to bright light" },
  { name: "Peace Lily", water: "Once a week", light: "Medium, indirect light" },
];

export default function PlantReminder() {
  const [currentPlant, setCurrentPlant] = useState(plantList[0]);

  const requestNotificationPermission = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const sendAlert = () => {
    if (Notification.permission === "granted") {
      new Notification(`🪴 Care Reminder: ${currentPlant.name}`, {
        body: `💧 Water: ${currentPlant.water} | ☀️ Sun: ${currentPlant.light}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <Card className="w-96 p-6 shadow-xl rounded-xl bg-white">
        <h2 className="text-lg font-semibold text-center mb-4">🪴 Plant Care Assistant</h2>
        <select
          className="w-full p-2 border rounded-lg"
          value={currentPlant.name}
          onChange={(e) =>
            setCurrentPlant(plantList.find((plant) => plant.name === e.target.value))
          }
        >
          {plantList.map((plant) => (
            <option key={plant.name} value={plant.name}>
              {plant.name}
            </option>
          ))}
        </select>
        <p className="mt-4">💧 Watering: {currentPlant.water}</p>
        <p className="mb-4">☀️ Sunlight: {currentPlant.light}</p>
        <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={sendAlert}>
          Set Notification
        </Button>
      </Card>
    </div>
  );
}
