import styles from "./sass_component.module.sass";

export default function SassComponent({ children }) {
  return (
    <div className="sass">
      <p>this part is styled by sass</p>
    </div>
  );
}
