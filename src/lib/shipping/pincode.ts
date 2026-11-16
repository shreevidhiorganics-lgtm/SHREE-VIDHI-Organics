export interface PinCodeInfo {
  pinCode: string;
  city: string;
  state: string;
  serviceable: boolean;
  estimatedDays: number;
  codAvailable: boolean;
}

// Major Indian Postal Hubs and regions database
const REGIONAL_PIN_MAP: Record<string, { city: string; state: string; days: number }> = {
  // Uttar Pradesh & NCR
  "221": { city: "Varanasi", state: "Uttar Pradesh", days: 1 }, // Origin city: Next day delivery
  "226": { city: "Lucknow", state: "Uttar Pradesh", days: 2 },
  "208": { city: "Kanpur", state: "Uttar Pradesh", days: 2 },
  "201": { city: "Noida / Ghaziabad", state: "Uttar Pradesh", days: 2 },
  "110": { city: "New Delhi", state: "Delhi", days: 2 },
  "122": { city: "Gurugram", state: "Haryana", days: 2 },
  // West
  "400": { city: "Mumbai", state: "Maharashtra", days: 3 },
  "411": { city: "Pune", state: "Maharashtra", days: 3 },
  "380": { city: "Ahmedabad", state: "Gujarat", days: 3 },
  // South
  "560": { city: "Bengaluru", state: "Karnataka", days: 3 },
  "500": { city: "Hyderabad", state: "Telangana", days: 3 },
  "600": { city: "Chennai", state: "Tamil Nadu", days: 4 },
  "682": { city: "Kochi", state: "Kerala", days: 4 },
  // East & Central
  "700": { city: "Kolkata", state: "West Bengal", days: 3 },
  "800": { city: "Patna", state: "Bihar", days: 2 },
  "462": { city: "Bhopal", state: "Madhya Pradesh", days: 3 },
  "302": { city: "Jaipur", state: "Rajasthan", days: 3 },
};

export function lookupIndianPinCode(pincode: string): PinCodeInfo {
  const cleanPin = pincode.replace(/[^0-9]/g, "");

  if (cleanPin.length !== 6) {
    return {
      pinCode: cleanPin,
      city: "",
      state: "",
      serviceable: false,
      estimatedDays: 0,
      codAvailable: false,
    };
  }

  const prefix3 = cleanPin.substring(0, 3);
  const matched = REGIONAL_PIN_MAP[prefix3];

  if (matched) {
    return {
      pinCode: cleanPin,
      city: matched.city,
      state: matched.state,
      serviceable: true,
      estimatedDays: matched.days,
      codAvailable: true,
    };
  }

  // General Pan-India delivery fallback for any valid 6-digit pin code
  return {
    pinCode: cleanPin,
    city: "Standard Hub",
    state: "India",
    serviceable: true,
    estimatedDays: 4,
    codAvailable: true,
  };
}
