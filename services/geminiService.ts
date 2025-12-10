import { GoogleGenAI, Type } from "@google/genai";
import { Position, ChartDataPoint } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to simulate a 30-day projection based on portfolio composition
export const generateSimulatedChartData = async (
  positions: Position[],
  currentTotalValue: number
): Promise<ChartDataPoint[]> => {
  
  if (!apiKey) {
    console.warn("No API Key provided. Returning mock simulation.");
    return generateMockSimulation(currentTotalValue);
  }

  const prompt = `
    You are a high-frequency trading simulation engine.
    Current Portfolio Context:
    - Total Value: $${currentTotalValue.toFixed(2)}
    - Top Holdings: ${positions.slice(0, 3).map(p => p.ticker).join(', ')}

    Task: Generate a realistic 30-day "Simulated Future Growth" projection for this portfolio. 
    The market is volatile but generally trending upwards with some noise.
    
    Return a JSON object containing an array of 30 data points.
    Each point has: "date" (starting from tomorrow, format YYYY-MM-DD), "value" (number), and "annotation" (string, optional short market note for significant moves).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            simulation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                  annotation: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const json = JSON.parse(response.text);
    return json.simulation || generateMockSimulation(currentTotalValue);
  } catch (error) {
    console.error("Gemini simulation failed:", error);
    return generateMockSimulation(currentTotalValue);
  }
};

// Fallback if API fails or key is missing
const generateMockSimulation = (startValue: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentValue = startValue;
  const today = new Date();

  for (let i = 1; i <= 30; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    
    // Random fluctuation between -1% and +1.2%
    const change = (Math.random() * 0.022) - 0.01;
    currentValue = currentValue * (1 + change);

    data.push({
      date: nextDate.toISOString().split('T')[0],
      value: parseFloat(currentValue.toFixed(2)),
      annotation: i % 10 === 0 ? "Market Correction" : undefined
    });
  }
  return data;
};