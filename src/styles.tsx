import { colors } from "./shared/theme";

export const title = {
  fontWeight: 600,
  fontSize: "24px",
  color: colors.neutral_dark,
};

export const toolbarWeb = {
  display: "flex",
  gap: "4px",
  marginBottom: "30px",
  marginLeft: "10px",
};

export const toolbarMobile = {
  display: "grid",
  marginBottom: "30px",
  gap: "4px",
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

export const borda = {
  border: "solid 1px",
  width: "200px",
  height: "5px",
  color: colors.primary_dark,
  backgroundColor: colors.primary_dark,
  borderRadius: "5px",
};

export const container = {
  backgroundColor: colors.primary_lightest,
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0
};

export const load = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 3
}
