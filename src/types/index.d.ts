declare module 'material-ui-color' {

  enum ColorFormat {
    "plain",
    "hex",
    "hsl",
    "rgb",
    "hsv"
  }

  type Raw = string | number | object | string[] | number[]

  interface ColorObject {
    css: React.CSSProperties;
    value: number;
    hex: string;
    raw: Raw
    name: string;
    alpha: number;
    rgb: [number, number, number];
    hsv: [number, number, number];
    hsl: [number, number, number];
  }
  
  interface ColorError extends ColorObject {
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

  interface ColorType extends ColorObject {
    format: ColorFormat;
  }
  
  type Color = ColorType | ColorError;
  type ColorValue = Color | string | number | Array<string | number>;
  type PaletteRecord = Record<string,string>;

  interface ColorPickerProps {
    value?: ColorValue;
    defaultValue?: ColorValue;
    disableTextfield?: boolean;
    hideTextfield?: boolean;
    deferred?: boolean;
    palette?: any;
    inputFormats?: ColorFormat[];
    disableAlpha?: boolean;
    disablePlainColor?: boolean;
    onChange: (color: Color) => void;
    onOpen?: () => void;
    openAtStart?: boolean;
    doPopup?: () => void;
    hslGradient?: boolean;
  }
  interface ColorPickerPaletteProps<T extends PaletteRecord | null> extends ColorPickerProps {
    palette?: T;
  }

  function ColorPicker<T extends PaletteRecord | null>(
    props: ColorPickerPaletteProps<T> | ColorPickerProps
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

  function ColorPalette<T extends Record<string, string>>(
    props: ColorPaletteProps<T>
  ): JSX.Element;

  interface ColorBoxProps {
    defaultValue?: ColorValue;
    value?: ColorValue;
    deferred?: boolean;
    palette?: Record<string, string>;
    inputFormats?: ColorFormat[];
    onChange: (color: Color) => void;
    disableAlpha?: boolean;
    hslGradient?: boolean;
  }

  function ColorBox(props: ColorBoxProps): JSX.Element;

  function TFunction(value: string): string;
  interface i18n {
    language: string;
  }
  
  interface Translation {
    t: typeof TFunction,
    i18n?: i18n;
  }

  function useTranslate(translation: () => Translation): Translation;

  function createColor(raw: Raw, format?: ColorFormat, disableAlpha?: boolean): Color;

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
    ColorFormat,
    ColorType,
    ColorValue,
    Raw,
    i18n,
    Translation,
    useTranslate,
    createColor,
  };
}
