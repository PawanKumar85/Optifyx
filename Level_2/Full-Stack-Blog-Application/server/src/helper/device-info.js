export const getDeviceInfo = async () => {
  try {
    const response = await fetch(
      "https://my-ip-address-orcin.vercel.app/api/v2/info"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const path = data.myInfo.locationInfo.location;
    const path2 = data.myInfo.browserInfo;

    const locationInfo = {
      ipAddress: data.myInfo.locationInfo.ipAddress,
      address: `${path.city} ${path.pin}, ${path.region}, ${path.country}`,
      platform: `${path2.browser}, ${path2.platform}`,
    };

    return locationInfo;
  } catch (error) {
    console.error("Error fetching device info:", error);
    throw error;
  }
};
