import { ReactNode } from "react";

export default function ErrorMessage({ children }: { children: ReactNode }) {
    return (
        <div>{children}</div>
    )
}
