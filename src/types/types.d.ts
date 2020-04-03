
  interface ColorObject {
    css: React.CSSProperties;
    value: number;
    hex: string;
    format: "hsl" | "rgb" | "hex";
    raw: string | number | object | string[] | number[];
    name: string;
    aplha: number;
    rgb: [number, number, number];
    hsv: [number, number, number];
    hsl: [number, number, number];
  }
  interface ColorError {
    raw: string | number | object | string[] | number[];
    css: React.CSSProperties;
    name: "none";
    error: "Wrong format" | "Not an hex value";
    value: 0;
    alpha: 1;
    format: "unknown";
    hex: "000000";
    rgb: [0, 0, 0];
    hsv: [0, 0, 0];
    hsl: [0, 0, 0];
  }
  type Color = ColorObject | ColorError;

  interface ColorPickerProps {
    value?: Color | string | number;
    disableTextfield?: boolean;
    deferred?: boolean;
    palette?: null;
    inputFormats?: string[];
    onChange: (color: Color) => void;
    onOpen?: () => void;
    openAtStart?: boolean;
    doPopup?: () => void;
  }
  interface ColorPickerPalettenProps<T extends Record<string, string>> {
    value?: Color | string | number;
    disableTextfield?: boolean;
    deferred?: boolean;
    palette: T;
    inputFormats?: string[];
    onChange: (color: Color | keyof T) => void;
    onOpen?: () => void;
    openAtStart?: boolean;
    doPopup?: () => void;
  }

  function ColorPicker<T extends Record<string, string> | null>(
    props: ColorPickerPalettenProps<T> | ColorPickerProps
  ): JSX.Element;

  interface ColorButtonProps {
    /**
    The color to display, could be a css valid string, an integer, or a Color object see  ColorType
   */
    color: Color | string | number;
    /**
    The size of the button in pixel
   */
    size?: number;
    /**
    The width of the button's border, not displayed if borderWidth=0
   */
    borderWidth?: number;
    /**
    The css color of the button's border, not displayed if borderWidth=0
   */
    borderColor?: string;
    /**
    A tooltip could be added to the button to display the color name or value
   */
    tooltip?: string;
  }

  function ColorButton(props: ColorButtonProps): JSX.Element;

  interface ColorInputProps {
    value?: Color | string | number;
    format?: string;
    onChange: (color: Color) => void;
  }

  function ColorInput(props: ColorInputProps): JSX.Element;

  interface ColorPaletteProps<T> {
    borderWidth?: number;
    palette: T;
    onSelect?: (color: keyof T) => void;
  }
  function ColorPalette<T extends Record<string, string>>(
    props: ColorPaletteProps<T>
  ): JSX.Element;

  interface ColorBoxProps {
    value?: Color | string | number;
    deferred?: boolean;
    palette?: Record<string, string>;
    inputFormats?: string[];
    onChange: (color: Color) => void;
  }
  function ColorBox(props: ColorBoxProps): JSX.Element;

  export {
    ColorPicker,
    ColorPickerProps,
    ColorInput,
    ColorInputProps,
    ColorButton,
    ColorButtonProps,
    ColorPalette,
    ColorPaletteProps,
    ColorBox,
    ColorBoxProps,
    Color,
    ColorObject
  };