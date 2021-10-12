import { BaseHTMLAttributes, ReactNode } from "react";
//import { RouteComponentProps, RouteProps } from "react-router";
import "../styles/Button.scss";

type ButtonProps = BaseHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};
//type ButtonProps2 = React.FC<RouteComponentProps<any>>;

export function Button({
  isOutlined = false,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}
