declare module 'material-ui-color-components' {

  enum ColorFormat {
    "plain",
    "hex",
    "hsl",
    "rgb",
    "hsv"
  }
  
  interface ColorBase {
    css: React.CSSProperties;
    value: number;
    hex: string;
    raw: string | number | object | Array<number | string>;
    name: string;
    alpha: number;
    rgb: [number, number, number];
    hsv: [number, number, number];
    hsl: [number, number, number];
  }
  
  interface ColorError extends ColorBase {
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
  
  interface ColorType extends ColorBase {
    format: ColorFormat;
  }
  
  type Color = ColorType | ColorError;
  type ColorValue = Color | string | number | Array<string | number>;
  
  interface ColorPickerProps {
    value?: ColorValue;
    defaultValue?: ColorValue;
    disableTextfield?: boolean;
    deferred?: boolean;
    palette?: Record<string, ColorValue>;
    inputFormats?: string[];
    onChange: (color: Color) => void;
    onOpen?: () => void;
    openAtStart?: boolean;
    doPopup?: () => void;
  }
  
  function ColorPicker(
    props: ColorPickerProps
  ): JSX.Element;
  
  interface ColorButtonProps {
    /**
    The color to display, could be a css valid string, an integer, or a Color object see  ColorType
   */
    color: ColorValue;
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
    value?: ColorValue;
    format?: string;
    onChange: (color: Color) => void;
  }
  
  function ColorInput(props: ColorInputProps): JSX.Element;
  
  interface ColorPaletteProps<T> {
    borderWidth?: number;
    palette: T;
    onSelect?: (color: keyof T) => void;
  }
  
  function ColorPalette<T extends Record<string, ColorValue>>(
    props: ColorPaletteProps<T>
  ): JSX.Element;
  
  interface ColorBoxProps {
    defaultValue?: ColorValue;
    value?: ColorValue;
    deferred?: boolean;
    palette?: Record<string, ColorValue>;
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
    ColorType,
    ColorValue,
  };
  
  }