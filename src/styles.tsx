import { colors } from "./shared/theme";

export const title = {
  fontWeight: 600, 
  fontSize: "24px",
  color: colors.neutral_dark, 
  marginBottom: 3,
}

export const toolbar1 = {
  display: 'flex', 
  justifyContent: "space-between", 
  marginBottom: 3,
}

export const button = {
  "&:hover": { backgroundColor: colors.primary_dark } ,
}