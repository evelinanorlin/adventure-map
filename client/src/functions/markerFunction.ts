import L, { PointExpression } from "leaflet";

export const getIcon = (fileName: string, _iconSize: PointExpression) => {
  const fileNameLowerCase = fileName.toLowerCase();
  const url = "/icons/" + fileNameLowerCase + ".svg";
  return L.icon({
    iconUrl: url,
    iconSize: _iconSize,
  });
};