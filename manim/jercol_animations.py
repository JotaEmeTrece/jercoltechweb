from manim import *

# ==========================================
# CONSTANTES DE DISEÑO (Jercol Technologies)
# ==========================================
COLOR_BG = "#101010"           
COLOR_NEUTRAL = "#606060"      
COLOR_PRIMARY = "#2B76FF"      
COLOR_ACCENT = "#D1A153"       
COLOR_SUCCESS = "#27C99F"      

FONT_MONO = "JetBrains Mono"
FONT_SERIF = "DM Serif Display"

# ==========================================
# CLASE BASE
# ==========================================
class JercolCanvas(Scene):
    def setup(self):
        self.camera.background_color = COLOR_BG

# ==========================================
# ESCENA 01: Pipeline Ingesta e Inferencia
# ==========================================
class PipelineIngestaInferencia(JercolCanvas):
    def construct(self):
        perfil_nodo = Square(side_length=1.0, color=COLOR_NEUTRAL).shift(LEFT * 4)
        orchestrator_core = Circle(radius=0.8, color=COLOR_PRIMARY).shift(RIGHT * 1)
        linea_flujo = Line(perfil_nodo.get_right(), orchestrator_core.get_left(), color=COLOR_NEUTRAL)
        lbl_profile = Text("BUSINESS_PROFILE", font=FONT_MONO, font_size=16, color=COLOR_NEUTRAL).next_to(perfil_nodo, UP, buff=0.3)
        lbl_orch = Text("ORCHESTRATOR_CORE", font=FONT_MONO, font_size=16, color=COLOR_PRIMARY).next_to(orchestrator_core, UP, buff=0.3)
        self.add(perfil_nodo, orchestrator_core, linea_flujo, lbl_profile, lbl_orch)
        paquete_datos = Dot(perfil_nodo.get_center(), color=COLOR_PRIMARY, radius=0.15)
        self.play(FadeIn(paquete_datos), perfil_nodo.animate.set_color(COLOR_PRIMARY), run_time=0.3)
        self.play(MoveAlongPath(paquete_datos, linea_flujo), rate_func=linear, run_time=1.2)
        self.play(Flash(orchestrator_core, color=COLOR_PRIMARY, line_length=0.3, num_lines=8, flash_radius=1.0),
                  FadeOut(paquete_datos, run_time=0.2),
                  orchestrator_core.animate.set_scale(1.15),
                  run_time=0.6, rate_func=rate_functions.ease_out_sine)
        self.play(orchestrator_core.animate.set_scale(1.0), run_time=0.2)

# ==========================================
# ESCENA 02: Consolidación de Mutación
# ==========================================
class ConsolidacionMutacion(JercolCanvas):
    def construct(self):
        orchestrator_core = Circle(radius=0.8, color=COLOR_PRIMARY).shift(LEFT * 3)
        t_hero = Square(side_length=0.6, color=COLOR_NEUTRAL).shift(RIGHT * 3 + UP * 2)
        t_cta = Square(side_length=0.6, color=COLOR_NEUTRAL).shift(RIGHT * 3)
        t_value = Square(side_length=0.6, color=COLOR_NEUTRAL).shift(RIGHT * 3 + DOWN * 2)
        targets = VGroup(t_hero, t_cta, t_value)
        l1 = Line(orchestrator_core.get_right(), t_hero.get_left(), color=COLOR_NEUTRAL, stroke_opacity=0.5)
        l2 = Line(orchestrator_core.get_right(), t_cta.get_left(), color=COLOR_NEUTRAL, stroke_opacity=0.5)
        l3 = Line(orchestrator_core.get_right(), t_value.get_left(), color=COLOR_NEUTRAL, stroke_opacity=0.5)
        self.add(orchestrator_core, targets, l1, l2, l3)
        p1 = Dot(orchestrator_core.get_right(), color=COLOR_SUCCESS, radius=0.1)
        p2 = Dot(orchestrator_core.get_right(), color=COLOR_SUCCESS, radius=0.1)
        p3 = Dot(orchestrator_core.get_right(), color=COLOR_SUCCESS, radius=0.1)
        self.play(MoveAlongPath(p1, l1), MoveAlongPath(p2, l2), MoveAlongPath(p3, l3),
                  orchestrator_core.animate.set_color(COLOR_SUCCESS),
                  rate_func=linear, run_time=0.6)
        self.play(FadeOut(p1, run_time=0.1), FadeOut(p2, run_time=0.1), FadeOut(p3, run_time=0.1),
                  t_hero.animate.set_color(COLOR_SUCCESS),
                  t_cta.animate.set_color(COLOR_SUCCESS),
                  t_value.animate.set_color(COLOR_SUCCESS),
                  Flash(t_hero, color=COLOR_SUCCESS, line_length=0.2, num_lines=4),
                  Flash(t_cta, color=COLOR_SUCCESS, line_length=0.2, num_lines=4),
                  run_time=0.6)

# ==========================================
# ESCENA 03: Mitigación Autónoma (Fallback)
# ==========================================
class MitigacionAutonomaFallback(JercolCanvas):
    def construct(self):
        nodo_origen = Circle(radius=0.6, color=COLOR_PRIMARY).shift(LEFT * 2.5)
        target_ui = Square(side_length=1.0, color=COLOR_NEUTRAL).shift(RIGHT * 2.5)
        ruta_primaria = Line(nodo_origen.get_right(), target_ui.get_left(), color=COLOR_PRIMARY)
        ruta_fallback = ArcBetweenPoints(nodo_origen.get_top(), target_ui.get_top(), angle=-TAU/3, color=COLOR_ACCENT)
        self.add(nodo_origen, target_ui, ruta_primaria)
        pulso_error = Dot(nodo_origen.get_right(), color=COLOR_PRIMARY)
        ruta_corta = Line(nodo_origen.get_right(), ORIGIN, color=COLOR_PRIMARY)
        self.play(MoveAlongPath(pulso_error, ruta_corta), rate_func=linear, run_time=0.3)
        self.play(FadeOut(ruta_primaria, run_time=0.2), FadeOut(pulso_error, run_time=0.2),
                  nodo_origen.animate.set_color(COLOR_ACCENT),
                  Create(ruta_fallback, run_time=0.3), run_time=0.3)
        pulso_seguro = Dot(nodo_origen.get_top(), color=COLOR_ACCENT)
        self.play(MoveAlongPath(pulso_seguro, ruta_fallback), target_ui.animate.set_color(COLOR_ACCENT),
                  rate_func=rate_functions.ease_out_sine, run_time=0.4)
        self.play(FadeOut(pulso_seguro), run_time=0.2)

# ==========================================
# ESCENA 04: Reposo de Infraestructura (Loop)
# ==========================================
class ReposoInfraestructura(JercolCanvas):
    def construct(self):
        grid = NumberPlane(x_range=[-10,10,1], y_range=[-10,10,1],
                           background_line_style={"stroke_color": COLOR_NEUTRAL, "stroke_width": 1, "stroke_opacity": 0.05})
        anillo_1 = Circle(radius=3, stroke_color=COLOR_PRIMARY, stroke_width=1, stroke_opacity=0.08)
        anillo_2 = Circle(radius=5, stroke_color=COLOR_ACCENT, stroke_width=1, stroke_opacity=0.04)
        nodo_a = Dot(UP*3, color=COLOR_PRIMARY, fill_opacity=0.1)
        nodo_b = Dot(DOWN*5, color=COLOR_ACCENT, fill_opacity=0.08)
        grupo_rotacion = VGroup(anillo_1, anillo_2, nodo_a, nodo_b)
        self.add(grid, grupo_rotacion)
        self.play(Rotate(grupo_rotacion, angle=TAU, about_point=ORIGIN), run_time=8, rate_func=linear)
