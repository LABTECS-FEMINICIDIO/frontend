import { colors } from "./shared/theme";

export const title = {
  fontWeight: 600,
  fontSize: "24px",
  color: colors.neutral_dark,
};

export const toolbar1 = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 3,
  marginLeft: '10px'
};

export const button = {
  "&:hover": { backgroundColor: colors.primary_dark },
};

export const caixaTag = {
  background: colors.neutral_lightest,
  borderRadius: 1,
  height: 350,
  marginLeft: 3,
  marginRight: 3,
  marginBottom: 2,
  padding: 2,
};
