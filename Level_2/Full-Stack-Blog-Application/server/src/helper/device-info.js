// device-info.js
export const getDeviceInfo = async () => {
  try {
    const response = await fetch(
      "https://my-ip-address-orcin.vercel.app/api/v2/info"
    );

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Access the nested paths
    const path = data.myInfo.locationInfo.location;
    const path2 = data.myInfo.browserInfo;

    // Create the locationInfo object
    const locationInfo = {
      ipAddress: data.myInfo.locationInfo.ipAddress,
      address: `${path.city} ${path.pin}, ${path.region}, ${path.country}`,
      platform: `${path2.browser}, ${path2.platform}`,
    };

    // Return the locationInfo object
    return locationInfo;
  } catch (error) {
    console.error("Error fetching device info:", error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};
