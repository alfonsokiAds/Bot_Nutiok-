#!/usr/bin/env python3
"""
Servidor HTTP local para la landing NUTIOK (solo archivos estáticos).
Uso: python serve.py
     python serve.py --port 3000
"""

from __future__ import annotations

import argparse
import contextlib
import os
import sys
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Sirve nutiok-landing en http://127.0.0.1:PUERTO/")
    parser.add_argument("--port", "-p", type=int, default=8080, help="Puerto TCP (por defecto 8080)")
    parser.add_argument(
        "--no-open",
        action="store_true",
        help="No abrir el navegador automáticamente",
    )
    args = parser.parse_args()

    root = Path(__file__).resolve().parent
    os.chdir(root)

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(root), **kw)

        def log_message(self, format, *log_args):
            # Mensajes más cortos en consola
            sys.stderr.write("%s - %s\n" % (self.address_string(), format % log_args))

    url = f"http://127.0.0.1:{args.port}/"
    try:
        httpd = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    except OSError as e:
        print(f"No se pudo iniciar el servidor en el puerto {args.port}: {e}", file=sys.stderr)
        sys.exit(1)

    print(f"NUTIOK — sirviendo desde: {root}")
    print(f"Abre en el navegador: {url}")
    print("Pulsa Ctrl+C para detener.\n")

    if not args.no_open:
        with contextlib.suppress(OSError):
            webbrowser.open(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
