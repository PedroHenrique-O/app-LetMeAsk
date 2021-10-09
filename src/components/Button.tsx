import { BaseHTMLAttributes } from "react";
//import { RouteComponentProps, RouteProps } from "react-router";
import "../styles/Button.scss";

type ButtonProps = BaseHTMLAttributes<HTMLButtonElement>;
//type ButtonProps2 = React.FC<RouteComponentProps<any>>;

export function Button(props: ButtonProps) {
  return <button className="button" {...props} />;
}
