// src/formatting.ts
var gradients = {
  purple: [
    [247, 81, 172],
    [55, 0, 231]
  ],
  sunset: [
    [231, 0, 187],
    [255, 244, 20]
  ],
  gray: [
    [235, 244, 245],
    [181, 198, 224]
  ],
  orange: [
    [255, 147, 15],
    [255, 249, 91]
  ],
  lime: [
    [89, 209, 2],
    [243, 245, 32]
  ],
  blue: [
    [31, 126, 161],
    [111, 247, 232]
  ],
  red: [
    [244, 7, 82],
    [249, 171, 143]
  ]
};
var lerp = (start, end, factor) => start + factor * (end - start);
function interpolateRGB(startColor, endColor, t) {
  if (t < 0) {
    return startColor;
  }
  ;
  if (t > 1) {
    return endColor;
  }
  ;
  return [
    Math.round(lerp(startColor[0], endColor[0], t)),
    Math.round(lerp(startColor[1], endColor[1], t)),
    Math.round(lerp(startColor[2], endColor[2], t))
  ];
}
function isBrowser() {
  return (
    //@ts-ignore
    typeof window !== "undefined" && typeof globalThis.Deno === "undefined"
  );
}
function formatAnsi(string, styles = {}) {
  let c = "";
  if (styles.bold) c += "1;";
  if (styles.italic) c += "3;";
  if (styles.underline) c += "4;";
  if (styles.foreground) c += `38;2;${styles.foreground.join(";")};`;
  if (styles.background) c += `48;2;${styles.background.join(";")};`;
  while (c.endsWith(";")) c = c.slice(0, -1);
  return {
    content: `\x1B[${c}m${string}\x1B[0m\x1B[0m`,
    styles: []
  };
}
function formatBrowser(string, options = {}) {
  const styles = [];
  if (options.bold) styles.push("font-weight: bold;");
  if (options.italic) styles.push("font-style: italic;");
  if (options.underline) styles.push("text-decoration: underline;");
  if (options.foreground)
    styles.push(`color: rgb(${options.foreground.join(", ")});`);
  if (options.background)
    styles.push(`background-color: rgb(${options.background.join(", ")});`);
  if (options.size) styles.push(`font-size: ${options.size}px;`);
  return {
    content: `%c${string}`,
    styles: [styles.join("")]
  };
}
function format(string, options = {}) {
  if (isBrowser()) return formatBrowser(string, options);
  return formatAnsi(string, options);
}
function stringGradient(str, gradient, options) {
  const result = {
    content: "",
    styles: []
  };
  if (isBrowser()) {
    result.content = "%c" + str.split("").join("%c");
    for (let i = 0; i < str.length; i++) {
      const g = interpolateRGB(gradient[0], gradient[1], i / str.length);
      result.styles.push(formatBrowser(str[i], { ...options, foreground: g }).styles[0]);
    }
    return result;
  }
  for (let i = 0; i < str.length; i++) {
    result.content += formatAnsi(str[i], {
      ...options,
      foreground: interpolateRGB(
        gradient[0],
        gradient[1],
        i / str.length
      )
    }).content;
  }
  return result;
}

// src/writer.ts
var Writer = class {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
};
var FancyConsoleWriter = class {
  constructor(name, level, color = gradients.sunset) {
    this.name = name;
    this.level = level;
    this.formattedName = stringGradient(`[ ${name} ]`, color);
    this.levels = {
      DEBUG: stringGradient("DEBUG", gradients.gray, { size: 12 }),
      INFO: stringGradient("INFO", gradients.blue),
      WARN: stringGradient("WARN", gradients.orange),
      SUCCESS: stringGradient("SUCCESS", gradients.lime),
      ERROR: stringGradient("ERROR", gradients.red, { bold: true }),
      CRITICAL: format("  CRITICAL  ", {
        background: [255, 0, 0],
        size: 20
      })
    };
  }
  formattedName;
  levels;
  write(msg) {
    const n = msg.type.name;
    const ts = format(String(msg.timestamp.getMilliseconds()), {
      foreground: [100, 100, 100]
    });
    console.log(
      this.formattedName.content + (n ? " " + this.levels[n].content : ""),
      ...this.formattedName.styles,
      ...n ? this.levels[n].styles : [],
      ...msg.content
    );
  }
};
var SimpleConsoleWriter = class {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
  write(msg) {
    console.log(
      `[${this.name}]`,
      msg.type.name,
      ...msg.content
    );
  }
};

// src/mod.ts
var env = globalThis.process?.env || // @ts-expect-error
import.meta.env || // @ts-expect-error
globalThis.Deno?.env.toObject() || // @ts-expect-error
globalThis.__env__;
var isColorSupported = !env.NO_COLOR && !env.FORCE_COLOR || !(env.TERM === "dumb") || !env.CI;
var Logger = class _Logger {
  static LogLevels = {
    DEBUG: 0,
    INFO: 1,
    SUCCESS: 1,
    WARN: 2,
    ERROR: 3,
    CRITICAL: 4,
    PRODUCTION: 5
  };
  constructor(options) {
    this.name = options.name;
    this.level = options.level;
    this.writer = new options.writer(this.name, this.level, options.color);
  }
  log(input, level = _Logger.LogLevels.INFO, name) {
    if (level < this.level) return;
    this.writer?.write({
      content: input,
      timestamp: /* @__PURE__ */ new Date(),
      type: {
        level,
        name
      }
    });
  }
  name;
  level;
  writer;
  debug = (...msg) => this.log(msg, _Logger.LogLevels.DEBUG, "DEBUG");
  info = (...msg) => this.log(msg, _Logger.LogLevels.INFO, "INFO");
  success = (...msg) => this.log(msg, _Logger.LogLevels.SUCCESS, "SUCCESS");
  warn = (...msg) => this.log(msg, _Logger.LogLevels.WARN, "WARN");
  error = (...msg) => this.log(msg, _Logger.LogLevels.ERROR, "ERROR");
  critical = (...msg) => this.log(msg, _Logger.LogLevels.CRITICAL, "CRITICAL");
  shout = (...msg) => this.log(msg, 999);
  speak = (...msg) => this.log(msg, _Logger.LogLevels.WARN);
  whisper = (...msg) => this.log(msg, _Logger.LogLevels.INFO);
};
function createLogger(config) {
  return new Logger({
    name: config.name,
    level: config.level,
    writer: config.writer ?? (isColorSupported ? FancyConsoleWriter : SimpleConsoleWriter),
    color: config.color ?? gradients.orange
  });
}
var Levels = Logger.LogLevels;
export {
  FancyConsoleWriter,
  Levels,
  Logger,
  SimpleConsoleWriter,
  Writer,
  createLogger,
  gradients,
  isColorSupported
};
