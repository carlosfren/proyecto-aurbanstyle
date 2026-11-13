import { createContext, useContext, useState } from "react";

export interface Usuario {
  nombre: string;
  correo: string;
}

interface UsuarioRegistrado extends Usuario {
  clave: string;
}

interface ResultadoAuth {
  ok: boolean;
  error?: string;
}

interface AuthContextValor {
  usuario: Usuario | null;
  registrar: (nombre: string, correo: string, clave: string) => ResultadoAuth;
  iniciarSesion: (correo: string, clave: string) => ResultadoAuth;
  cerrarSesion: () => void;
}

const CLAVE_USUARIOS = "urbanstyle_usuarios";
const CLAVE_SESION = "urbanstyle_sesion";

const AuthContext = createContext<AuthContextValor | null>(null);

function leerUsuarios(): UsuarioRegistrado[] {
  try {
    const raw = localStorage.getItem(CLAVE_USUARIOS);
    return raw ? (JSON.parse(raw) as UsuarioRegistrado[]) : [];
  } catch {
    return [];
  }
}

function leerSesion(): Usuario | null {
  try {
    const raw = localStorage.getItem(CLAVE_SESION);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => leerSesion());

  const guardarSesion = (datos: Usuario | null) => {
    setUsuario(datos);
    try {
      if (datos) {
        localStorage.setItem(CLAVE_SESION, JSON.stringify(datos));
      } else {
        localStorage.removeItem(CLAVE_SESION);
      }
    } catch {
      // Ignorar errores de almacenamiento restringido
    }
  };

  const registrar = (
    nombre: string,
    correo: string,
    clave: string,
  ): ResultadoAuth => {
    const correoLimpio = correo.trim().toLowerCase();
    const nombreLimpio = nombre.trim();
    const usuarios = leerUsuarios();

    if (usuarios.some((u) => u.correo === correoLimpio)) {
      return {
        ok: false,
        error: "Ya existe una cuenta registrada con ese correo electrónico.",
      };
    }

    const nuevo: UsuarioRegistrado = {
      nombre: nombreLimpio,
      correo: correoLimpio,
      clave,
    };

    try {
      localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify([...usuarios, nuevo]),
      );
    } catch {
      // Continuar con sesión en memoria si localStorage falla
    }

    guardarSesion({ nombre: nombreLimpio, correo: correoLimpio });
    return { ok: true };
  };

  const iniciarSesion = (correo: string, clave: string): ResultadoAuth => {
    const correoLimpio = correo.trim().toLowerCase();
    const usuarios = leerUsuarios();
    const encontrado = usuarios.find(
      (u) => u.correo === correoLimpio && u.clave === clave,
    );

    if (!encontrado) {
      return {
        ok: false,
        error:
          "Correo o contraseña incorrectos. Verifica tus datos o regístrate.",
      };
    }

    guardarSesion({ nombre: encontrado.nombre, correo: encontrado.correo });
    return { ok: true };
  };

  const cerrarSesion = () => {
    guardarSesion(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, registrar, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValor {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}
