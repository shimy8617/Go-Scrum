import {render, screen} from "@testing-library/react";
import { Donate } from "./Donate";

describe("renderizado en Donate", () => {
    it("renderiza un h1", () => {
        render(<Donate />)
    
        expect(screen.getByRole("heading", {level:1, name: "Colaborá con el proyecto"})).toBeInTheDocument()
    })
    
    it("renderiza un a", () => {
        render(<Donate />)
    
        expect(screen.getByRole("link")).toHaveAttribute("href","https://mpago.la")
    })

    it("renderiza un href", () => {
        render(<Donate />)
    
        expect(screen.getByRole("link")).toHaveAttribute("href","https://mpago.la")
    })

    it("renderiza un target _blank", () => {
        render(<Donate />)
    
        expect(screen.getByRole("link")).toHaveAttribute("target","_blank")
    })
})