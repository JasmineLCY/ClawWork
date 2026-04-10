---
theme: default
title: 加固 OpenClaw Agent — 纵深防御
info: |
  ## Hardening OpenClaw Agent
  Defense in Depth — A ClawWork Case Study.

  [GitHub](https://github.com/clawwork-ai/ClawWork)
author: samzong
keywords: openclaw,desktop,agent,security,defense-in-depth
highlighter: shiki
colorSchema: all
drawings:
  persist: false
transition: slide-left
favicon: /images/clawwork-logo.png
exportFilename: clawwork-defense-keynote
---

<DeckCoverDefenseSlide />

---

# 👋 {{ $t({ en: 'About Me', zh: '关于我', ja: '自己紹介', ko: '소개', fr: 'À propos', de: 'Über mich', es: 'Sobre mí', pt: 'Sobre mim' }) }}

<DeckAboutMeSlide />

---

<div class="cw-grid"></div>
<div class="glow-orb glow-purple cw-pulse" style="top:-80px; right:30%;"></div>
<div class="glow-orb glow-cyan cw-pulse" style="bottom:-60px; left:25%;"></div>

<div class="cw-thanks-shell">
  <h1 class="cw-display-title">
    <span class="cw-shimmer">{{ $t({ en: 'Why Defense?', zh: '为什么谈安全？', ja: 'なぜ防御？', ko: '왜 방어인가?', fr: 'Pourquoi la défense ?', de: 'Warum Verteidigung?', es: '¿Por qué defensa?', pt: 'Por que defesa?' }) }}</span>
  </h1>
  <p class="cw-thanks-copy">{{ $t({ en: 'From "AI that talks" to "AI that acts".', zh: '从"会说话的 AI"到"能干活的 AI"。', ja: '「話す AI」から「働く AI」へ。', ko: '"말하는 AI"에서 "일하는 AI"로.', fr: "De « l'IA qui parle » à « l'IA qui agit ».", de: 'Vom "redenden" zum "handelnden" KI.', es: 'De "IA que habla" a "IA que actúa".', pt: 'De "IA que fala" para "IA que age".' }) }}</p>
</div>

---

# 🦐 {{ $t({ en: 'What is an Agent?', zh: '什么是龙虾？', ja: 'Agent とは？', ko: 'Agent란?', fr: "Qu'est-ce qu'un Agent ?", de: 'Was ist ein Agent?', es: '¿Qué es un Agent?', pt: 'O que é um Agent?' }) }}

<div class="cw-kicker">{{ $t({ en: 'From "answering" to "executing".', zh: '从"会回答问题"到"可执行任务"。', ja: '「答える」から「実行する」へ。', ko: '"답하기"에서 "실행하기"로.', fr: 'De « répondre » à « exécuter ».', de: 'Vom "Antworten" zum "Ausführen".', es: 'De "responder" a "ejecutar".', pt: 'De "responder" para "executar".' }) }}</div>

<div class="grid grid-cols-2 gap-4 mt-6">
  <DeckFeatureCard
    tone="red"
    icon="💬"
    :title="{ en: 'Traditional LLM', zh: '传统大模型 (LLM)', ja: '従来の LLM', ko: '전통 LLM', fr: 'LLM traditionnel', de: 'Traditionelles LLM', es: 'LLM tradicional', pt: 'LLM tradicional' }"
    :body="{ en: 'Only answers questions. Stays in the chat. You do the rest yourself.', zh: '只会回答问题，停留在对话，后续事情全靠人做。', ja: '質問に答えるだけ。会話で終わる。残りは人間任せ。', ko: '질문에 답만 함. 대화에서 멈춤. 나머지는 사람이 함.', fr: 'Répond seulement. Reste dans le chat. Vous faites le reste.', de: 'Antwortet nur. Bleibt beim Chat. Den Rest machst du selbst.', es: 'Solo responde. Se queda en el chat. Tú haces el resto.', pt: 'Apenas responde. Fica no chat. Você faz o resto.' }"
  />
  <DeckFeatureCard
    tone="green"
    icon="⚡"
    :title="{ en: 'OpenClaw Agent', zh: 'OpenClaw Agent', ja: 'OpenClaw Agent', ko: 'OpenClaw Agent', fr: 'OpenClaw Agent', de: 'OpenClaw Agent', es: 'OpenClaw Agent', pt: 'OpenClaw Agent' }"
    :body="{ en: 'Calls tools, reads files, hits APIs. Completes the task end-to-end.', zh: '调用工具、读文件、发请求。端到端完成任务。', ja: 'ツール呼出、ファイル読取、API 実行。エンドツーエンドで完遂。', ko: '도구 호출, 파일 읽기, API 호출. 엔드투엔드로 완료.', fr: 'Appelle des outils, lit des fichiers, frappe des APIs. Tâche de bout en bout.', de: 'Nutzt Tools, liest Dateien, trifft APIs. Erledigt Aufgaben Ende-zu-Ende.', es: 'Llama herramientas, lee archivos, golpea APIs. Tarea de extremo a extremo.', pt: 'Chama ferramentas, lê arquivos, bate APIs. Tarefa ponta a ponta.' }"
  />
</div>

<div class="cw-note-panel mt-6" data-tone="cyan">
  <p class="cw-note-copy" v-html="$t({ en: 'Same expense report — traditional AI <strong>tells you how</strong>. OpenClaw Agent <strong>does it</strong>: scan receipts → fill the form → submit to OA → notify you.', zh: '同一个报销流程 —— 传统 AI <strong>告诉你怎么做</strong>：&ldquo;需要发票、行程单、审批表...&rdquo;。OpenClaw Agent <strong>直接做完</strong>：识别发票 → 填写报销单 → 调用 OA 提交审批 → 通知你结果。', ja: '同じ経費精算 — 従来 AI は<strong>手順を教える</strong>。OpenClaw Agent は<strong>実行する</strong>：領収書認識 → フォーム記入 → OA 提出 → 通知。', ko: '같은 경비 처리 — 전통 AI는 <strong>방법만 알려줌</strong>. OpenClaw Agent는 <strong>직접 실행</strong>: 영수증 인식 → 양식 작성 → OA 제출 → 알림.', fr: 'Même note de frais — l’IA classique <strong>vous dit comment</strong>. OpenClaw Agent <strong>le fait</strong> : scan → formulaire → OA → notification.', de: 'Gleiche Spesenabrechnung — Klassische KI <strong>sagt wie</strong>. OpenClaw Agent <strong>macht es</strong>: Belege → Formular → OA → Meldung.', es: 'Mismo reembolso — IA clásica <strong>te dice cómo</strong>. OpenClaw Agent <strong>lo hace</strong>: recibos → formulario → OA → aviso.', pt: 'Mesmo reembolso — IA clássica <strong>diz como</strong>. OpenClaw Agent <strong>faz</strong>: recibos → formulário → OA → aviso.' })"></p>
</div>

<div class="cw-note-panel mt-4" data-tone="red">
  <p class="cw-note-copy" v-html="$t({ en: '<strong>Because it can do things — we must now talk about what it can do wrong.</strong>', zh: '<strong>正因为它能&ldquo;做&rdquo; —— 接下来，我们要谈它能&ldquo;做错&rdquo;什么。</strong>', ja: '<strong>「実行できる」からこそ — 次は「間違える」話をする。</strong>', ko: '<strong>&ldquo;실행할 수 있다&rdquo; — 그래서 이제 &ldquo;잘못할 수 있는 것&rdquo;을 이야기해야 한다.</strong>', fr: '<strong>Parce qu’il peut agir — parlons de ce qu’il peut mal faire.</strong>', de: '<strong>Weil er handeln kann — reden wir, was schiefgehen kann.</strong>', es: '<strong>Porque puede actuar — hablemos de lo que puede salir mal.</strong>', pt: '<strong>Porque ele pode agir — vamos falar do que pode dar errado.</strong>' })"></p>
</div>

---

# 🧨 {{ $t({ en: "Agent's New Threat Model", zh: 'Agent 的新威胁模型', ja: 'Agent の新しい脅威モデル', ko: 'Agent의 새로운 위협 모델', fr: 'Nouveau modèle de menace', de: 'Neues Bedrohungsmodell', es: 'Nuevo modelo de amenazas', pt: 'Novo modelo de ameaça' }) }}

<div class="cw-kicker">{{ $t({ en: 'Traditional software vs Agent software — one table says it all.', zh: '传统软件 vs Agent 软件 —— 一张表讲清楚。', ja: '従来のソフトウェア vs Agent ソフトウェア — 一目でわかる。', ko: '전통 소프트웨어 vs Agent 소프트웨어 — 한 표로 정리.', fr: 'Logiciel classique vs Agent — un tableau suffit.', de: 'Klassische vs Agent-Software — eine Tabelle sagt alles.', es: 'Software tradicional vs Agent — una tabla lo dice todo.', pt: 'Software tradicional vs Agent — uma tabela diz tudo.' }) }}</div>

<div class="grid grid-cols-2 gap-4 mt-6">
  <DeckMiniPanel tone="cyan" :title="{ en: 'Code', zh: '代码', ja: 'コード', ko: '코드', fr: 'Code', de: 'Code', es: 'Código', pt: 'Código' }" :body="{ en: 'Classic: static — hunt for vulns. Agent: dynamic — the Agent itself can be hijacked.', zh: '传统：静态，找漏洞。Agent：动态，Agent 本身可能被操控。', ja: '従来：静的、脆弱性探し。Agent：動的、Agent 自体が操られる。', ko: '전통: 정적, 취약점 탐색. Agent: 동적, Agent 자체가 조종됨.', fr: 'Classique : statique. Agent : dynamique, lui-même manipulable.', de: 'Klassisch: statisch. Agent: dynamisch, selbst manipulierbar.', es: 'Clásico: estático. Agent: dinámico, manipulable.', pt: 'Clássico: estático. Agent: dinâmico, manipulável.' }" />

  <DeckMiniPanel tone="red" :title="{ en: 'Input', zh: '输入', ja: '入力', ko: '입력', fr: 'Entrée', de: 'Eingabe', es: 'Entrada', pt: 'Entrada' }" :body="{ en: 'Classic: data ≠ command. Agent: input IS command (prompt injection).', zh: '传统：数据 ≠ 指令。Agent：输入即指令（prompt injection）。', ja: '従来：データ ≠ 命令。Agent：入力が命令（prompt injection）。', ko: '전통: 데이터 ≠ 명령. Agent: 입력이 곧 명령 (prompt injection).', fr: 'Classique : données ≠ commande. Agent : entrée = commande.', de: 'Klassisch: Daten ≠ Befehl. Agent: Eingabe IST Befehl.', es: 'Clásico: datos ≠ comando. Agent: entrada es comando.', pt: 'Clássico: dados ≠ comando. Agent: entrada é comando.' }" />

  <DeckMiniPanel tone="yellow" :title="{ en: 'Privilege', zh: '权限', ja: '権限', ko: '권한', fr: 'Privilège', de: 'Rechte', es: 'Privilegios', pt: 'Privilégio' }" :body="{ en: 'Classic: fixed. Agent: tool-call rights get borrowed (confused deputy).', zh: '传统：固定。Agent：工具调用权限被借用（confused deputy）。', ja: '従来：固定。Agent：ツール呼出権限が借用される。', ko: '전통: 고정. Agent: 도구 호출 권한이 빌려짐 (confused deputy).', fr: 'Classique : fixes. Agent : appels outils empruntés.', de: 'Klassisch: fest. Agent: Tool-Rechte werden entliehen.', es: 'Clásico: fijos. Agent: derechos de herramienta prestados.', pt: 'Clássico: fixos. Agent: direitos de ferramenta emprestados.' }" />

  <DeckMiniPanel tone="purple" :title="{ en: 'Patch', zh: '补丁', ja: 'パッチ', ko: '패치', fr: 'Correctif', de: 'Patch', es: 'Parche', pt: 'Patch' }" :body="{ en: 'Classic: fixable. Agent: prompt injection has no patch.', zh: '传统：能修。Agent：Prompt 注入没有&ldquo;补丁&rdquo;。', ja: '従来：修正可能。Agent：Prompt injection に&ldquo;パッチ&rdquo;なし。', ko: '전통: 수정 가능. Agent: Prompt injection에는 패치 없음.', fr: 'Classique : corrigible. Agent : pas de correctif à une injection.', de: 'Klassisch: fixbar. Agent: Prompt-Injection hat keinen Patch.', es: 'Clásico: parchable. Agent: no hay parche para inyección.', pt: 'Clássico: corrigível. Agent: sem patch para injection.' }" />
</div>

<div class="cw-note-panel mt-6" data-tone="red">
  <p class="cw-note-copy" v-html="$t({ en: 'One sentence: <strong>in the Agent era, the boundary between input and command disappears.</strong> Defense in Depth is no longer optional.', zh: '一句话：<strong>Agent 时代，输入与指令的边界消失。</strong>纵深防御不是加分项，是前提。', ja: '一言：<strong>Agent 時代、入力と命令の境界は消える。</strong>多層防御は前提。', ko: '한마디: <strong>Agent 시대, 입력과 명령의 경계가 사라진다.</strong> 심층 방어는 전제.', fr: 'En un mot : <strong>à l’ère Agent, la frontière entre entrée et commande disparaît.</strong> La défense en profondeur est un prérequis.', de: 'In einem Satz: <strong>Im Agent-Zeitalter verschwindet die Grenze zwischen Eingabe und Befehl.</strong> Defense in Depth ist Pflicht.', es: 'En una frase: <strong>en la era Agent, desaparece el límite entre entrada y comando.</strong> La defensa en profundidad es un requisito.', pt: 'Em uma frase: <strong>na era Agent, a fronteira entre entrada e comando desaparece.</strong> Defesa em profundidade é pré-requisito.' })"></p>
</div>

---

# ⚠️ {{ $t({ en: 'Six Core Risks', zh: '六大核心风险', ja: '6つのコアリスク', ko: '6대 핵심 위험', fr: 'Six risques majeurs', de: 'Sechs Kernrisiken', es: 'Seis riesgos clave', pt: 'Seis riscos centrais' }) }}

<div class="cw-kicker">{{ $t({ en: 'Each one can be fatal. OpenClaw is "AI that can execute" — every hole is a double-edged sword.', zh: 'OpenClaw 是&ldquo;能执行&rdquo;的 AI —— 所以每一个漏洞都是双刃剑。', ja: 'OpenClaw は&ldquo;実行できる&rdquo; AI —— どの穴も両刃の剣。', ko: 'OpenClaw는 &ldquo;실행 가능한&rdquo; AI —— 모든 구멍이 양날의 검.', fr: "OpenClaw est une IA qui exécute — chaque faille est une épée à double tranchant.", de: 'OpenClaw ist ausführende KI — jede Lücke ist zweischneidig.', es: 'OpenClaw es IA que ejecuta — cada agujero es espada de doble filo.', pt: 'OpenClaw é IA que executa — cada falha é espada de dois gumes.' }) }}</div>

<div class="grid grid-cols-3 gap-3 mt-6">
  <DeckFeatureCard
    compact
    tone="red"
    icon="🎯"
    :title="{ en: 'Prompt Injection', zh: '提示词注入', ja: 'プロンプト注入', ko: '프롬프트 주입', fr: 'Injection de prompt', de: 'Prompt Injection', es: 'Inyección de prompt', pt: 'Injeção de prompt' }"
    :body="{ en: 'Crafted prompts bypass guardrails. Data leak, system damage.', zh: '精心设计的提示词绕过安全限制。数据泄露、系统破坏。', ja: '巧妙な prompt がガードを回避。データ漏洩・破壊。', ko: '정교한 프롬프트가 가드를 우회. 데이터 유출, 시스템 파괴.', fr: 'Prompts conçus contournent les garde-fous. Fuite, dégâts.', de: 'Gezielte Prompts umgehen Schutz. Leak, Schaden.', es: 'Prompts diseñados burlan controles. Fuga, daño.', pt: 'Prompts engenhosos burlam guardas. Vazamento, dano.' }"
  />
  <DeckFeatureCard
    compact
    tone="purple"
    icon="🧩"
    :title="{ en: 'Malicious Plugins', zh: '恶意插件', ja: '悪意あるプラグイン', ko: '악성 플러그인', fr: 'Plugins malveillants', de: 'Bösartige Plugins', es: 'Plugins maliciosos', pt: 'Plugins maliciosos' }"
    :body="{ en: 'ClawHub plugins may ship malware. Supply-chain → remote control.', zh: 'ClawHub 插件可能包含恶意代码。供应链攻击 → 远程控制。', ja: 'ClawHub のプラグインにマルウェア混入の恐れ。サプライチェーン → 遠隔制御。', ko: 'ClawHub 플러그인에 악성 코드 가능. 공급망 → 원격 제어.', fr: 'Plugins ClawHub peuvent contenir du malware. Chaîne → contrôle à distance.', de: 'ClawHub-Plugins können Malware enthalten. Supply-Chain → Fernsteuerung.', es: 'Plugins de ClawHub pueden traer malware. Cadena → control remoto.', pt: 'Plugins do ClawHub podem trazer malware. Supply-chain → controle remoto.' }"
  />
  <DeckFeatureCard
    compact
    tone="yellow"
    icon="🕵️"
    :title="{ en: 'Session Hijack', zh: '会话劫持', ja: 'セッション乗取り', ko: '세션 하이재킹', fr: 'Détournement de session', de: 'Session-Hijacking', es: 'Secuestro de sesión', pt: 'Sequestro de sessão' }"
    :body="{ en: 'Attackers grab session tokens. Identity forged, hard to detect.', zh: '攻击者截获会话令牌，冒充合法用户，难以发现。', ja: 'セッショントークン窃取でユーザー偽装、検知困難。', ko: '세션 토큰 탈취로 신원 위조, 탐지 어려움.', fr: 'Jetons de session volés. Identité falsifiée.', de: 'Session-Tokens abgegriffen. Identität gefälscht.', es: 'Tokens robados. Identidad falsificada.', pt: 'Tokens roubados. Identidade forjada.' }"
  />
  <DeckFeatureCard
    compact
    tone="red"
    icon="🔓"
    :title="{ en: 'Over-Privilege', zh: '越权访问', ja: '権限過大', ko: '권한 초과', fr: 'Sur-privilège', de: 'Überrechte', es: 'Sobre-privilegio', pt: 'Sobre-privilégio' }"
    :body="{ en: 'Agent granted too much. Reads beyond its job. Sensitive data leaked.', zh: 'Agent 权限过高，访问超出职责范围。敏感数据泄露。', ja: 'Agent の権限が過大。職務外へアクセス。機密漏洩。', ko: 'Agent 권한 과도. 직무 범위 초과. 민감 정보 유출.', fr: 'Agent trop privilégié. Accès hors-périmètre. Fuite.', de: 'Agent überprivilegiert. Zugriff außerhalb. Leak.', es: 'Agent sobre-privilegiado. Acceso fuera de alcance. Fuga.', pt: 'Agent com privilégio excessivo. Acesso fora do escopo. Vazamento.' }"
  />
  <DeckFeatureCard
    compact
    tone="cyan"
    icon="👁️"
    :title="{ en: 'No Audit Trail', zh: '无审计', ja: '監査なし', ko: '감사 부재', fr: 'Pas d’audit', de: 'Kein Audit', es: 'Sin auditoría', pt: 'Sem auditoria' }"
    :body="{ en: 'No logs, no trace after incident. Compliance risk.', zh: '无完整日志，事后无法追溯、无法追责。合规风险。', ja: 'ログ不足、事後追跡不可能。コンプライアンスリスク。', ko: '로그 부족, 사후 추적 불가. 컴플라이언스 위험.', fr: 'Pas de logs, aucune traçabilité. Risque conformité.', de: 'Keine Logs, keine Nachverfolgung. Compliance-Risiko.', es: 'Sin logs ni trazabilidad. Riesgo de cumplimiento.', pt: 'Sem logs ou rastro. Risco de compliance.' }"
  />
  <DeckFeatureCard
    compact
    tone="purple"
    icon="📈"
    :title="{ en: 'API Abuse', zh: 'API 滥用', ja: 'API 濫用', ko: 'API 남용', fr: 'Abus d’API', de: 'API-Missbrauch', es: 'Abuso de API', pt: 'Abuso de API' }"
    :body="{ en: 'Runaway token burn. No budget control. Cost explosion.', zh: 'Token 消耗失控，缺成本管控。成本爆炸。', ja: 'Token 消費暴走、コスト管理不足。費用爆発。', ko: 'Token 소비 폭주, 비용 관리 미흡. 비용 폭발.', fr: 'Tokens incontrôlés, pas de budget. Coût explosif.', de: 'Token-Explosion, kein Budget. Kosten explodieren.', es: 'Tokens descontrolados, sin presupuesto. Costo explosivo.', pt: 'Tokens descontrolados, sem orçamento. Custo explosivo.' }"
  />
</div>

<div class="cw-note-panel mt-4" data-tone="red">
  <p class="cw-note-copy" v-html="$t({ en: '<strong>Prompt injection is just the trigger.</strong> The real loss comes from the fact that Agents <strong>have tool privileges</strong> in the first place. Enterprise security is not about blocking every hole — it’s about making sure when one breaks, another layer still catches it.', zh: '<strong>Prompt injection 只是触发器。</strong>真正的损失来自 Agent 有&ldquo;工具权限&rdquo;这件事本身。企业养虾必守安全底线 —— 不追求堵死每一个，而是让任何一个被突破时，其他层还能抓住它。', ja: '<strong>Prompt injection は引き金に過ぎない。</strong>本当の損失は Agent が&ldquo;ツール権限&rdquo;を持つこと自体から。どれか突破されても他層が止められるようにする。', ko: '<strong>Prompt injection은 방아쇠에 불과.</strong> 진짜 손실은 Agent가 &ldquo;도구 권한&rdquo;을 가진다는 사실 자체. 하나 뚫려도 다른 층이 잡도록.', fr: '<strong>L’injection n’est qu’un déclencheur.</strong> La vraie perte vient du fait que l’Agent <strong>a des privilèges</strong>. Quand une couche cède, une autre doit rattraper.', de: '<strong>Prompt Injection ist nur der Auslöser.</strong> Der echte Verlust kommt davon, dass Agents <strong>Tool-Rechte</strong> haben. Wenn eine Schicht fällt, muss die nächste halten.', es: '<strong>La inyección es solo el gatillo.</strong> La pérdida real viene de que el Agent <strong>tiene privilegios</strong>. Si una capa cae, otra debe atajar.', pt: '<strong>Injection é só o gatilho.</strong> A perda real vem de o Agent <strong>ter privilégios</strong>. Se uma camada cai, outra precisa segurar.' })"></p>
</div>

---

<div class="cw-grid"></div>
<div class="glow-orb glow-green cw-pulse" style="top:-80px; right:20%;"></div>
<div class="glow-orb glow-cyan cw-pulse" style="bottom:-60px; left:35%;"></div>

<div class="cw-thanks-shell">
  <h1 class="cw-display-title">
    <span class="cw-shimmer">{{ $t({ en: 'Defense in Depth', zh: '纵深防御', ja: '多層防御', ko: '심층 방어', fr: 'Défense en profondeur', de: 'Defense in Depth', es: 'Defensa en profundidad', pt: 'Defesa em profundidade' }) }}</span>
  </h1>
  <p class="cw-thanks-copy">{{ $t({ en: "ClawWork's layered defense map.", zh: 'ClawWork 的分层防御地图。', ja: 'ClawWork の分層防御マップ。', ko: 'ClawWork의 계층 방어 지도.', fr: 'La carte de défense en couches de ClawWork.', de: 'ClawWorks mehrschichtige Verteidigungskarte.', es: 'El mapa de defensa por capas de ClawWork.', pt: 'O mapa de defesa em camadas do ClawWork.' }) }}</p>
</div>

---

# 🗺️ {{ $t({ en: 'Layered Defense Map', zh: '分层防御地图', ja: '分層防御マップ', ko: '계층 방어 지도', fr: 'Carte de défense', de: 'Verteidigungskarte', es: 'Mapa de defensa', pt: 'Mapa de defesa' }) }}

<div class="cw-kicker">{{ $t({ en: '6 risks → 5 direct defenses + 1 still open.', zh: '6 个风险 → 5 个直接防御 + 1 个待解决。', ja: '6 つのリスク → 5 つの直接防御 + 1 つ未解決。', ko: '6개 위험 → 5개 직접 방어 + 1개 미해결.', fr: '6 risques → 5 défenses directes + 1 en suspens.', de: '6 Risiken → 5 direkte Verteidigungen + 1 offen.', es: '6 riesgos → 5 defensas directas + 1 pendiente.', pt: '6 riscos → 5 defesas diretas + 1 em aberto.' }) }}</div>

```text
┌────────────────────────────────────────────────────────┐
│  横切 · 观测     操作审计日志 + Token 配额                │
│                  防 👁️ 无审计  /  📈 API 滥用             │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  L7  UX         明确审批 + Dialog guard  ← 🎯 提示词注入 │
│  L6  文件系统    realpath + 工作区 scope   ← 🔓 越权访问  │
│  L5  密钥        宿主 OS keychain         ← 二进制逆向    │
│  L4  消息        单写入者持久化            ← history 污染  │
│  L3  会话        buildSessionKey 强隔离    ← 🕵️ 会话劫持 │
│  L2  网络        SSRF guard               ← 内网穿透     │
│  L1  进程        Electron 硬化             ← renderer RCE │
└────────────────────────────────────────────────────────┘
```

<div class="cw-note-panel mt-4" data-tone="green">
  <p class="cw-note-copy" v-html="$t({ en: '✓ Covers 5: <strong>prompt injection · over-privilege · session hijack · no audit · API abuse</strong>. 🚧 1 left — <strong>malicious plugins / supply-chain</strong> still unsolved (details later). Every layer fights alone, the cross-cutting layer watches all — we trust none to hold by itself.', zh: '✓ 覆盖 5 个：<strong>提示词注入 · 越权访问 · 会话劫持 · 无审计 · API 滥用</strong>。🚧 剩 1 个 —— <strong>恶意插件 / 供应链</strong> 还没完美解决，稍后专门讲。每一层独立设防，横切层全程观测 —— 不信任任何一层不会被突破。', ja: '✓ 5 つカバー：<strong>prompt injection · 権限過大 · セッション乗取り · 監査なし · API 濫用</strong>。🚧 残り 1 —— <strong>悪意あるプラグイン / サプライチェーン</strong> は未解決。各層独立、横切層で全観測。', ko: '✓ 5개 커버: <strong>프롬프트 주입 · 권한 초과 · 세션 하이재킹 · 감사 부재 · API 남용</strong>. 🚧 1개 남음 — <strong>악성 플러그인 / 공급망</strong>. 각 층 독립, 횡단 층이 전체 관찰.', fr: '✓ 5 couvertes : <strong>injection · sur-privilège · détournement · audit · abus API</strong>. 🚧 1 restante — <strong>plugins malveillants / chaîne</strong>. Chaque couche indépendante.', de: '✓ 5 abgedeckt: <strong>Injection · Überrechte · Hijack · Audit · API-Missbrauch</strong>. 🚧 1 offen — <strong>Plugins / Supply-Chain</strong>. Jede Schicht unabhängig.', es: '✓ 5 cubiertos: <strong>inyección · sobre-privilegio · secuestro · auditoría · abuso API</strong>. 🚧 1 pendiente — <strong>plugins / cadena</strong>. Cada capa independiente.', pt: '✓ 5 cobertos: <strong>injection · sobre-privilégio · sequestro · auditoria · abuso API</strong>. 🚧 1 aberto — <strong>plugins / supply-chain</strong>. Cada camada independente.' })"></p>
</div>

---

# 🔑 {{ $t({ en: 'Session Key — Cross-Task Isolation', zh: 'Session Key — 防跨 Task 串流', ja: 'Session Key — タスク間分離', ko: 'Session Key — Task 간 격리', fr: 'Session Key — Isolation inter-tâches', de: 'Session Key — Task-Isolation', es: 'Session Key — Aislamiento entre tareas', pt: 'Session Key — Isolamento entre tarefas' }) }}

<div class="cw-kicker">{{ $t({ en: 'A seemingly boring design that saved us from a real incident.', zh: '一个看似无聊、但踩过真实事故的设计。', ja: '無味乾燥に見えて、実際の事故を踏んだ設計。', ko: '지루해 보이지만 실제 사고를 겪은 설계.', fr: "Un design qui paraît banal — mais qui vient d'un vrai incident.", de: 'Ein scheinbar banaler Entwurf — aus einem echten Vorfall geboren.', es: 'Un diseño aparentemente aburrido — nacido de un incidente real.', pt: 'Um design aparentemente chato — nascido de um incidente real.' }) }}</div>

```typescript
// packages/shared/src/constants.ts
buildSessionKey(taskId, 'main');
// → 'agent:main:clawwork:task:<taskId>'
```

<ul class="cw-bullets mt-4">
  <li v-html="$t({ en: '<strong>Function-only construction</strong> — no raw string concat allowed', zh: '<strong>只能用函数构造</strong>，不准拼字符串', ja: '<strong>関数でのみ構築</strong>、文字列結合禁止', ko: '<strong>함수로만 생성</strong>, 문자열 조합 금지', fr: '<strong>Construction uniquement par fonction</strong> — pas de concaténation', de: '<strong>Nur per Funktion</strong> — keine String-Konkatenation', es: '<strong>Solo por función</strong> — sin concatenar strings', pt: '<strong>Só por função</strong> — sem concatenar strings' })"></li>
  <li v-html="$t({ en: '<strong>Gateway broadcasts everything</strong> — clients MUST filter by sessionKey', zh: '<strong>Gateway 广播所有事件</strong>，客户端必须按 sessionKey 过滤', ja: '<strong>Gateway は全イベント配信</strong>、クライアントは sessionKey でフィルタ必須', ko: '<strong>Gateway는 모든 이벤트 브로드캐스트</strong>, 클라이언트는 sessionKey로 필터 필수', fr: '<strong>Gateway diffuse tout</strong> — les clients doivent filtrer par sessionKey', de: '<strong>Gateway sendet alles</strong> — Clients MÜSSEN nach sessionKey filtern', es: '<strong>Gateway difunde todo</strong> — clientes DEBEN filtrar por sessionKey', pt: '<strong>Gateway transmite tudo</strong> — clientes DEVEM filtrar por sessionKey' })"></li>
  <li v-html="$t({ en: '<strong>One missed filter = cross-task data leak</strong>', zh: '<strong>漏一个过滤器 = 跨 Task 数据泄漏</strong>', ja: '<strong>フィルタ漏れ = タスク間データ漏洩</strong>', ko: '<strong>필터 누락 = Task 간 데이터 유출</strong>', fr: '<strong>Un filtre manquant = fuite inter-tâches</strong>', de: '<strong>Ein fehlender Filter = Task-übergreifender Leak</strong>', es: '<strong>Un filtro omitido = fuga entre tareas</strong>', pt: '<strong>Um filtro esquecido = vazamento entre tarefas</strong>' })"></li>
</ul>

<div class="cw-note-panel mt-4" data-tone="red">
  <p class="cw-note-copy" v-html="$t({ en: 'This is not theory. <strong>We actually missed a filter once in review.</strong> Single-writer + strong sessionKey became our safety net.', zh: '这不是理论。<strong>我们真的在一次 review 里漏过一个过滤器。</strong>单写入者 + 强 sessionKey 的组合，是我们后来的兜底。', ja: '理論ではない。<strong>実際にレビューで一度フィルタを漏らした。</strong>単一書き手 + 強 sessionKey が後の保険となった。', ko: '이론이 아니다. <strong>실제로 리뷰에서 한 번 필터를 놓쳤다.</strong> 단일 작성자 + 강한 sessionKey가 안전망이 됐다.', fr: 'Pas de théorie. <strong>On a vraiment raté un filtre en revue.</strong> Writer unique + sessionKey fort — notre filet.', de: 'Keine Theorie. <strong>Wir haben tatsächlich einen Filter im Review übersehen.</strong> Single-Writer + starker sessionKey — unser Netz.', es: 'No es teoría. <strong>Realmente olvidamos un filtro en review.</strong> Writer único + sessionKey fuerte — nuestra red.', pt: 'Não é teoria. <strong>Realmente esquecemos um filtro em review.</strong> Writer único + sessionKey forte — nossa rede.' })"></p>
</div>

---

# 🚧 {{ $t({ en: 'Open Problems', zh: '还没解决的问题', ja: '未解決の問題', ko: '미해결 문제', fr: 'Problèmes ouverts', de: 'Offene Probleme', es: 'Problemas abiertos', pt: 'Problemas em aberto' }) }}

<div class="cw-kicker">{{ $t({ en: 'An honest list — not every layer is airtight.', zh: '诚实清单 —— 不是所有层都严丝合缝。', ja: '正直なリスト — すべての層が完璧ではない。', ko: '솔직한 목록 — 모든 층이 완벽하진 않다.', fr: 'Une liste honnête — toutes les couches ne sont pas étanches.', de: 'Eine ehrliche Liste — nicht jede Schicht ist dicht.', es: 'Lista honesta — no todas las capas son herméticas.', pt: 'Lista honesta — nem toda camada é hermética.' }) }}</div>

<ul class="cw-bullets mt-6">
  <li v-html="$t({ en: '<strong>Prompt Injection itself</strong> — no silver bullet in the industry', zh: '<strong>Prompt Injection 本身</strong> —— 业界没有银弹', ja: '<strong>Prompt Injection そのもの</strong> —— 業界に銀の弾丸なし', ko: '<strong>Prompt Injection 자체</strong> —— 업계에 은탄은 없다', fr: '<strong>L’injection de prompt elle-même</strong> — pas de solution miracle', de: '<strong>Prompt Injection selbst</strong> — keine Silver Bullet', es: '<strong>La inyección misma</strong> — no hay bala de plata', pt: '<strong>Prompt Injection em si</strong> — sem bala de prata' })"></li>
  <li v-html="$t({ en: '<strong>Third-party Skill supply chain</strong> — no automated signature audit yet', zh: '<strong>第三方 Skill 供应链</strong> —— 没有自动化签名审计', ja: '<strong>サードパーティ Skill サプライチェーン</strong> —— 署名監査未整備', ko: '<strong>서드파티 Skill 공급망</strong> —— 자동 서명 감사 없음', fr: '<strong>Chaîne Skill tierce</strong> — pas d’audit de signature automatisé', de: '<strong>Drittanbieter-Skill-Supply-Chain</strong> — kein Signatur-Audit', es: '<strong>Cadena Skill de terceros</strong> — sin auditoría de firma', pt: '<strong>Supply-chain de Skills</strong> — sem auditoria de assinatura' })"></li>
  <li v-html="$t({ en: '<strong>Agent file scope</strong> — still relies on users configuring workspace correctly', zh: '<strong>Agent 文件 scope</strong> —— 依赖用户自觉配置工作区', ja: '<strong>Agent ファイル scope</strong> —— ユーザーの workspace 設定頼み', ko: '<strong>Agent 파일 scope</strong> —— 사용자의 workspace 설정에 의존', fr: '<strong>Scope fichier Agent</strong> — dépend de la config utilisateur', de: '<strong>Agent-Datei-Scope</strong> — hängt von Nutzerkonfiguration ab', es: '<strong>Scope de archivos</strong> — depende de la config del usuario', pt: '<strong>Scope de arquivos</strong> — depende da config do usuário' })"></li>
  <li v-html="$t({ en: '<strong>Gateway-level policy</strong> — missing a pluggable policy engine', zh: '<strong>Gateway 层 policy</strong> —— 缺可插拔 policy 引擎', ja: '<strong>Gateway レイヤ policy</strong> —— プラガブルなエンジン不足', ko: '<strong>Gateway 정책</strong> —— 플러그형 엔진 부족', fr: '<strong>Policy Gateway</strong> — pas de moteur enfichable', de: '<strong>Gateway-Policy</strong> — kein Plugin-Engine', es: '<strong>Policy en Gateway</strong> — sin motor conectable', pt: '<strong>Policy do Gateway</strong> — sem motor plugável' })"></li>
</ul>

<div class="cw-note-panel mt-4" data-tone="purple">
  <p class="cw-note-copy" v-html="$t({ en: '<strong>This is why Defense in Depth exists.</strong> Even if one layer falls, the others catch it. No perfect boundary — only layered redundancy.', zh: '<strong>这就是纵深防御存在的理由：</strong>即使某一层被突破，其他层还能兜底。没有完美的边界 —— 只有层层的冗余。', ja: '<strong>これが多層防御の理由。</strong>どれか破られても他層が止める。完璧な境界はない — 層ごとの冗長性のみ。', ko: '<strong>이것이 심층 방어의 이유.</strong> 한 층이 뚫려도 다른 층이 막는다. 완벽한 경계는 없다 — 오직 층층의 여분.', fr: '<strong>Voilà pourquoi la défense en profondeur existe.</strong> Même si une couche tombe, les autres rattrapent. Pas de frontière parfaite — seulement de la redondance.', de: '<strong>Deshalb gibt es Defense in Depth.</strong> Fällt eine Schicht, fangen andere sie. Keine perfekte Grenze — nur geschichtete Redundanz.', es: '<strong>Por eso existe la defensa en profundidad.</strong> Si una capa cae, las otras atajan. No hay frontera perfecta — solo redundancia por capas.', pt: '<strong>Por isso existe defesa em profundidade.</strong> Se uma camada cai, as outras seguram. Sem fronteira perfeita — só redundância em camadas.' })"></p>
</div>

---

# 🎯 {{ $t({ en: 'Three Takeaways → Into the Real Thing', zh: '小结 → 进入正题', ja: 'まとめ → 本題へ', ko: '요약 → 본론으로', fr: 'Récap → passons au vif', de: 'Fazit → zum Thema', es: 'Resumen → al grano', pt: 'Resumo → ao que interessa' }) }}

<div class="cw-kicker">{{ $t({ en: 'Three things to walk away with:', zh: '三个带走的点：', ja: '持ち帰ってほしい 3 点：', ko: '가지고 갈 세 가지:', fr: 'Trois choses à retenir :', de: 'Drei Dinge zum Mitnehmen:', es: 'Tres cosas para llevar:', pt: 'Três coisas para levar:' }) }}</div>

<ul class="cw-bullets mt-6">
  <li v-html="$t({ en: '<strong>1.</strong> In the Agent era, security is an engineering <strong>prerequisite</strong>, not a feature', zh: '<strong>1.</strong> Agent 时代，安全是工程<strong>前提</strong>，不是功能', ja: '<strong>1.</strong> Agent 時代、セキュリティは<strong>前提</strong>であり機能ではない', ko: '<strong>1.</strong> Agent 시대, 보안은 엔지니어링 <strong>전제</strong>이지 기능이 아니다', fr: '<strong>1.</strong> À l’ère Agent, la sécurité est un <strong>prérequis</strong>, pas une fonctionnalité', de: '<strong>1.</strong> Im Agent-Zeitalter ist Sicherheit eine <strong>Voraussetzung</strong>, kein Feature', es: '<strong>1.</strong> En la era Agent, la seguridad es un <strong>prerequisito</strong>, no una función', pt: '<strong>1.</strong> Na era Agent, segurança é um <strong>pré-requisito</strong>, não uma feature' })"></li>
  <li v-html="$t({ en: '<strong>2.</strong> The value of Defense in Depth lies not in “perfection” but in <strong>redundancy</strong>', zh: '<strong>2.</strong> 纵深防御的价值不在&ldquo;完美&rdquo;，在<strong>&ldquo;冗余&rdquo;</strong>', ja: '<strong>2.</strong> 多層防御の価値は&ldquo;完璧&rdquo;ではなく<strong>&ldquo;冗長性&rdquo;</strong>にある', ko: '<strong>2.</strong> 심층 방어의 가치는 &ldquo;완벽&rdquo;이 아니라 <strong>&ldquo;여분&rdquo;</strong>', fr: '<strong>2.</strong> La valeur de la défense en profondeur : pas la perfection, mais la <strong>redondance</strong>', de: '<strong>2.</strong> Der Wert liegt nicht in „Perfektion“, sondern in <strong>Redundanz</strong>', es: '<strong>2.</strong> El valor está en la <strong>redundancia</strong>, no en la perfección', pt: '<strong>2.</strong> O valor está na <strong>redundância</strong>, não na perfeição' })"></li>
  <li v-html="$t({ en: '<strong>3.</strong> ClawWork as a case study: <strong>7 stacked layers</strong>, each answering one real threat', zh: '<strong>3.</strong> ClawWork 作为 case study：<strong>7 层叠加</strong>，每层对应一个真实威胁', ja: '<strong>3.</strong> ClawWork はケーススタディ：<strong>7 層の積み重ね</strong>、各層が実際の脅威に対応', ko: '<strong>3.</strong> ClawWork는 사례 연구: <strong>7개 층 누적</strong>, 각 층이 실제 위협에 대응', fr: '<strong>3.</strong> ClawWork en étude de cas : <strong>7 couches empilées</strong>, chacune pour une menace réelle', de: '<strong>3.</strong> ClawWork als Fallstudie: <strong>7 gestapelte Schichten</strong>, jede gegen eine echte Bedrohung', es: '<strong>3.</strong> ClawWork como caso: <strong>7 capas apiladas</strong>, cada una contra una amenaza real', pt: '<strong>3.</strong> ClawWork como case: <strong>7 camadas empilhadas</strong>, cada uma contra uma ameaça real' })"></li>
</ul>

<div class="cw-note-panel mt-6" data-tone="green">
  <p class="cw-note-copy" v-html="$t({ en: '<strong>So — let’s see what this “defense-in-depth workbench” actually looks like in daily use. 👇</strong>', zh: '<strong>那么，让我们看看这个&ldquo;纵深防御的工作台&rdquo;日常用起来到底长什么样 —— 👇</strong>', ja: '<strong>では、この&ldquo;多層防御のワークベンチ&rdquo;が日常でどう見えるか見てみよう —— 👇</strong>', ko: '<strong>그럼, 이 &ldquo;심층 방어 워크벤치&rdquo;가 일상에서 어떻게 보이는지 봅시다 —— 👇</strong>', fr: '<strong>Alors — voyons à quoi ressemble cet « atelier de défense » au quotidien 👇</strong>', de: '<strong>Also — schauen wir, wie diese „Defense-in-Depth-Werkbank“ im Alltag aussieht 👇</strong>', es: '<strong>Entonces — veamos cómo se ve este &ldquo;banco de defensa&rdquo; en el día a día 👇</strong>', pt: '<strong>Então — vamos ver como é esse &ldquo;workbench de defesa&rdquo; no dia a dia 👇</strong>' })"></p>
</div>

---

<div class="cw-grid"></div>
<div class="glow-orb glow-purple cw-pulse" style="top:-80px; right:30%;"></div>
<div class="glow-orb glow-cyan cw-pulse" style="bottom:-60px; left:25%;"></div>

<div class="cw-thanks-shell">
  <h1 class="cw-display-title">
    <span class="cw-shimmer">{{ $t({ en: 'Why?', zh: '为什么？', ja: 'なぜ？', ko: '왜?', fr: 'Pourquoi ?', de: 'Warum?', es: '¿Por qué?', pt: 'Por quê?' }) }}</span>
  </h1>
  <p class="cw-thanks-copy">{{ $t({ en: 'The problem with the current workflow.', zh: '当前工作流的问题。', ja: '現在のワークフローの問題。', ko: '현재 워크플로의 문제.', fr: 'Le problème du workflow actuel.', de: 'Das Problem mit dem aktuellen Workflow.', es: 'El problema con el flujo actual.', pt: 'O problema com o fluxo atual.' }) }}</p>
</div>

---

# 😤 {{ $t({ en: 'Pain Points of Using OpenClaw', zh: '养虾的痛点', ja: 'OpenClaw の課題', ko: 'OpenClaw 사용 시 문제점', fr: "Points faibles d'OpenClaw", de: 'Schwachstellen von OpenClaw', es: 'Problemas de OpenClaw', pt: 'Problemas do OpenClaw' }) }}

<div class="cw-kicker">{{ $t({ en: '"One window, one task, one context."', zh: '"一个窗口，一个任务，一个上下文。"', ja: '「1つのウィンドウ、1つのタスク、1つのコンテキスト」', ko: '"하나의 창, 하나의 태스크, 하나의 컨텍스트."', fr: '"Une fenêtre, une tâche, un contexte."', de: '"Ein Fenster, eine Aufgabe, ein Kontext."', es: '"Una ventana, una tarea, un contexto."', pt: '"Uma janela, uma tarefa, um contexto."' }) }}</div>

<div class="grid grid-cols-2 gap-2">
  <DeckFeatureCard
    compact
    tone="red"
    icon="🔗"
    :title="{ en: 'Serial Interaction', zh: '串行交互', ja: '逐次実行', ko: '순차적 상호작용', fr: 'Interaction séquentielle', de: 'Sequentielle Interaktion', es: 'Interacción secuencial', pt: 'Interação sequencial' }"
    :body="{ en: 'Agent is powerful, but forces one task at a time. Real work is parallel.', zh: 'Agent 很强大，但一次只能做一件事。真实工作是并行的。', ja: 'Agent は強力だが、一度に1つのタスクしかできない。実際の仕事は並列。', ko: 'Agent는 강력하지만 한 번에 하나의 태스크만 가능. 실제 업무는 병렬.', fr: 'Agent est puissant, mais impose une tâche à la fois. Le vrai travail est parallèle.', de: 'Agent ist mächtig, aber erzwingt eine Aufgabe gleichzeitig. Echte Arbeit ist parallel.', es: 'Agent es potente, pero fuerza una tarea a la vez. El trabajo real es paralelo.', pt: 'Agent é poderoso, mas força uma tarefa por vez. O trabalho real é paralelo.' }"
  />
  <DeckFeatureCard
    compact
    tone="red"
    icon="📂"
    :title="{ en: 'Scattered Artifacts', zh: '产物散落', ja: '散在するアーティファクト', ko: '흩어진 산출물', fr: 'Artefacts dispersés', de: 'Verstreute Artefakte', es: 'Artefactos dispersos', pt: 'Artefatos dispersos' }"
    :body="{ en: 'Code, files, docs scatter across conversations. Copy-paste to collect.', zh: '代码、文件、文档散落在各个对话中，靠复制粘贴收集。', ja: 'コード、ファイル、ドキュメントが会話に散在。コピペで収集。', ko: '코드, 파일, 문서가 대화에 흩어짐. 복사-붙여넣기로 수집.', fr: 'Code, fichiers, docs éparpillés entre conversations. Copier-coller pour collecter.', de: 'Code, Dateien, Docs über Gespräche verstreut. Copy-Paste zum Sammeln.', es: 'Código, archivos, docs dispersos en conversaciones. Copiar-pegar para recopilar.', pt: 'Código, arquivos, docs espalhados pelas conversas. Copiar-colar para coletar.' }"
  />
  <DeckFeatureCard
    compact
    tone="red"
    icon="🔄"
    :title="{ en: 'Context Switching', zh: '上下文切换', ja: 'コンテキスト切替', ko: '컨텍스트 전환', fr: 'Changement de contexte', de: 'Kontextwechsel', es: 'Cambio de contexto', pt: 'Troca de contexto' }"
    :body="{ en: 'Switching tabs to check status breaks flow. No structured progress tracking.', zh: '切换标签页查看状态会打断心流，没有结构化的进度追踪。', ja: 'タブ切替で状態確認するとフローが途切れる。構造化された進捗追跡がない。', ko: '탭 전환으로 상태 확인 시 흐름이 끊김. 구조화된 진행 추적 없음.', fr: 'Changer d’onglet pour vérifier l’état coupe le flux. Pas de suivi structuré.', de: 'Tab-Wechsel zum Statuscheck unterbricht den Flow. Kein strukturiertes Tracking.', es: 'Cambiar pestañas para revisar estado rompe el flujo. Sin seguimiento estructurado.', pt: 'Trocar abas para verificar status quebra o fluxo. Sem acompanhamento estruturado.' }"
  />
  <DeckFeatureCard
    compact
    tone="red"
    icon="💬"
    :title="{ en: 'Text-Only Control', zh: '纯文字控制', ja: 'テキストのみの操作', ko: '텍스트 전용 제어', fr: 'Contrôle texte uniquement', de: 'Nur-Text-Steuerung', es: 'Control solo texto', pt: 'Controle apenas texto' }"
    :body="{ en: 'Replying \'yes\' for approvals is ambiguous. No direct tool-call binding.', zh: '靠回复 yes 审批工具调用过于模糊，也没有直接的工具调用绑定。', ja: 'yes と返信して承認するのは曖昧。ツール呼び出しへの直接バインディングがない。', ko: 'yes로 답변하는 승인은 모호함. 직접적인 도구 호출 바인딩 없음.', fr: 'Répondre oui pour approuver est ambigu. Pas de liaison directe aux appels d’outils.', de: 'Mit yes genehmigen ist mehrdeutig. Keine direkte Tool-Call-Bindung.', es: 'Responder sí para aprobar es ambiguo. Sin vinculación directa a llamadas de herramientas.', pt: 'Responder yes para aprovar é ambíguo. Sem vinculação direta a chamadas de ferramentas.' }"
  />
</div>

---

<div class="cw-grid"></div>
<div class="glow-orb glow-green cw-pulse" style="top:-80px; right:20%;"></div>
<div class="glow-orb glow-cyan cw-pulse" style="bottom:-60px; left:35%;"></div>

<div class="cw-thanks-shell">
  <h1 class="cw-display-title">
    <span class="cw-shimmer">{{ $t({ en: 'The Answer', zh: '答案', ja: '答え', ko: '해답', fr: 'La Réponse', de: 'Die Antwort', es: 'La Respuesta', pt: 'A Resposta' }) }}</span>
  </h1>
  <p class="cw-thanks-copy">{{ $t({ en: 'Meet ClawWork.', zh: 'ClawWork 登场。', ja: 'ClawWork の登場。', ko: 'ClawWork 등장.', fr: 'Voici ClawWork.', de: 'Hier kommt ClawWork.', es: 'Presentamos ClawWork.', pt: 'Apresentando ClawWork.' }) }}</p>
</div>

---

# 🦐 {{ $t({ en: 'What is ClawWork', zh: 'ClawWork 是什么', ja: 'ClawWork とは', ko: 'ClawWork란', fr: "Qu'est-ce que ClawWork", de: 'Was ist ClawWork', es: 'Qué es ClawWork', pt: 'O que é o ClawWork' }) }}

<div class="cw-kicker" v-html="$t({ en: 'A desktop client for OpenClaw, <strong>built for parallel work</strong>.', zh: '一个 OpenClaw 桌面客户端，<strong>为并行工作而生</strong>。', ja: 'OpenClaw のデスクトップクライアント、<strong>並列作業のために構築</strong>。', ko: 'OpenClaw 데스크톱 클라이언트, <strong>병렬 작업을 위해 설계</strong>.', fr: 'Un client bureau pour OpenClaw, <strong>conçu pour le travail parallèle</strong>.', de: 'Ein Desktop-Client für OpenClaw, <strong>gebaut für paralleles Arbeiten</strong>.', es: 'Un cliente de escritorio para OpenClaw, <strong>diseñado para trabajo paralelo</strong>.', pt: 'Um cliente desktop para OpenClaw, <strong>feito para trabalho paralelo</strong>.' })"></div>

<div class="grid grid-cols-3 gap-6 mt-8">
  <DeckFeatureCard
    tone="green"
    icon="⚡"
    :title="{ en: 'Multi-Session', zh: '多会话', ja: 'マルチセッション', ko: '멀티 세션', fr: 'Multi-session', de: 'Multi-Sitzung', es: 'Multisesión', pt: 'Multissessão' }"
    :body="{ en: 'Multiple Agent conversations running simultaneously. No more waiting.', zh: '多个 Agent 对话同时运行，不再排队等待。', ja: '複数の Agent 会話が同時実行。もう待つ必要はない。', ko: '여러 Agent 대화가 동시에 실행. 더 이상 기다릴 필요 없음.', fr: 'Plusieurs conversations Agent en simultané. Fini l’attente.', de: 'Mehrere Agent-Gespräche gleichzeitig. Kein Warten mehr.', es: 'Múltiples conversaciones Agent simultáneas. Sin más esperas.', pt: 'Múltiplas conversas Agent simultâneas. Sem mais espera.' }"
  />
  <DeckFeatureCard
    tone="cyan"
    icon="🎯"
    :title="{ en: 'Parallel Tasks', zh: '并行任务', ja: '並列タスク', ko: '병렬 태스크', fr: 'Tâches parallèles', de: 'Parallele Aufgaben', es: 'Tareas paralelas', pt: 'Tarefas paralelas' }"
    :body="{ en: 'Each task is an independent session. Isolated context, tracked progress.', zh: '每个任务是独立会话。隔离上下文，追踪进度。', ja: '各タスクは独立したセッション。分離されたコンテキスト、追跡される進捗。', ko: '각 태스크는 독립된 세션. 격리된 컨텍스트, 추적되는 진행.', fr: 'Chaque tâche est une session indépendante. Contexte isolé, progression suivie.', de: 'Jede Aufgabe ist eine unabhängige Sitzung. Isolierter Kontext, verfolgter Fortschritt.', es: 'Cada tarea es una sesión independiente. Contexto aislado, progreso rastreado.', pt: 'Cada tarefa é uma sessão independente. Contexto isolado, progresso rastreado.' }"
  />
  <DeckFeatureCard
    tone="purple"
    icon="📦"
    :title="{ en: 'File Management', zh: '文件管理', ja: 'ファイル管理', ko: '파일 관리', fr: 'Gestion de fichiers', de: 'Dateiverwaltung', es: 'Gestión de archivos', pt: 'Gestão de ficheiros' }"
    :body="{ en: 'Every Agent output is automatically collected, browsable, and searchable.', zh: '所有 Agent 产出自动收集，可浏览，可搜索。', ja: 'すべての Agent 出力を自動収集、閲覧・検索可能。', ko: '모든 Agent 출력을 자동 수집, 탐색 및 검색 가능.', fr: 'Chaque sortie Agent est automatiquement collectée, navigable et recherchable.', de: 'Jede Agent-Ausgabe wird automatisch gesammelt, durchsuchbar und navigierbar.', es: 'Cada salida del Agent se recopila automáticamente, navegable y buscable.', pt: 'Cada saída do Agent é coletada automaticamente, navegável e pesquisável.' }"
  />
</div>

<div class="cw-badge-row">
  <span class="cw-badge" data-tone="cyan">{{ $t({ en: 'ZERO SERVER CHANGES', zh: '零服务端改动', ja: 'サーバー変更ゼロ', ko: '서버 변경 불필요', fr: 'ZÉRO MODIFICATION SERVEUR', de: 'KEINE SERVER-ÄNDERUNGEN', es: 'CERO CAMBIOS EN SERVIDOR', pt: 'ZERO ALTERAÇÕES NO SERVIDOR' }) }}</span>
  <span class="cw-badge-copy">{{ $t({ en: 'Connects via standard Gateway protocol', zh: '通过标准 Gateway 协议连接', ja: '標準 Gateway プロトコルで接続', ko: '표준 Gateway 프로토콜로 연결', fr: 'Connexion via le protocole Gateway standard', de: 'Verbindung über Standard-Gateway-Protokoll', es: 'Conecta mediante protocolo Gateway estándar', pt: 'Conecta via protocolo Gateway padrão' }) }}</span>
</div>

---

# 🖥 {{ $t({ en: 'Overview', zh: '一览', ja: '概観', ko: '한눈에', fr: 'Vue d’ensemble', de: 'Überblick', es: 'Vista general', pt: 'Visão geral' }) }}

<div class="cw-kicker">{{ $t({ en: 'All three pillars in one workbench.', zh: '三大支柱，一个工作台。', ja: '3つの柱を1つのワークベンチに。', ko: '세 가지 기둥을 하나의 워크벤치에.', fr: 'Les trois piliers en un seul atelier.', de: 'Alle drei Säulen in einer Werkbank.', es: 'Los tres pilares en un solo banco.', pt: 'Os três pilares em uma bancada.' }) }}</div>

<div style="display: flex; justify-content: center; margin-top: 16px;">
  <img src="/images/clawwork-screenshot.png" class="cw-shot cw-shot--hero" alt="ClawWork overview" />
</div>

---

<div class="cw-grid"></div>
<div class="glow-orb glow-cyan cw-pulse" style="top:-80px; left:35%;"></div>
<div class="glow-orb glow-purple cw-pulse" style="bottom:-60px; right:20%;"></div>

<div class="cw-thanks-shell">
  <h1 class="cw-display-title">
    <span class="cw-shimmer">{{ $t({ en: 'Product Tour', zh: '产品之旅', ja: 'プロダクトツアー', ko: '제품 투어', fr: 'Visite du produit', de: 'Produkt-Tour', es: 'Tour del producto', pt: 'Tour do produto' }) }}</span>
  </h1>
  <p class="cw-thanks-copy">{{ $t({ en: 'What it looks like inside.', zh: '看看里面长什么样。', ja: '中身を見てみよう。', ko: '내부를 살펴봅시다.', fr: 'À quoi ça ressemble à l\'intérieur.', de: 'Wie es von innen aussieht.', es: 'Cómo se ve por dentro.', pt: 'Como é por dentro.' }) }}</p>
</div>

---

## layout: split-media

# 🖥 {{ $t({ en: 'Three-Panel Layout', zh: '三栏布局', ja: '3ペインレイアウト', ko: '3패널 레이아웃', fr: 'Disposition en trois panneaux', de: 'Drei-Panel-Layout', es: 'Diseño de tres paneles', pt: 'Layout de três painéis' }) }}

<div class="cw-kicker">{{ $t({ en: 'Left, Center, Right. Everything visible at once.', zh: '左、中、右。一目了然。', ja: '左・中央・右。すべてが一目で見える。', ko: '왼쪽, 가운데, 오른쪽. 한눈에 모든 것을.', fr: 'Gauche, centre, droite. Tout visible en un coup d’œil.', de: 'Links, Mitte, Rechts. Alles auf einen Blick.', es: 'Izquierda, centro, derecha. Todo visible de un vistazo.', pt: 'Esquerda, centro, direita. Tudo visível de uma vez.' }) }}</div>

::left::

<img src="/images/three-panel-full.png" class="cw-shot cw-shot--panel" alt="ClawWork three-panel layout" />

::right::

<DeckMiniPanel neutral tone="green" :title="{ en: 'Left Nav', zh: '左侧导航', ja: '左ナビ', ko: '좌측 네비', fr: 'Nav gauche', de: 'Linke Nav', es: 'Nav izquierda', pt: 'Nav esquerda' }" :body="{ en: 'Task list, gateway selector, cron jobs.', zh: '任务列表、网关选择、定时任务。', ja: 'タスク一覧、Gateway 選択、定時ジョブ。', ko: '태스크 목록, Gateway 선택, 크론 작업.', fr: 'Liste des tâches, sélecteur Gateway, tâches planifiées.', de: 'Aufgabenliste, Gateway-Auswahl, Cron-Jobs.', es: 'Lista de tareas, selector Gateway, tareas programadas.', pt: 'Lista de tarefas, seletor Gateway, tarefas agendadas.' }" />

<DeckMiniPanel neutral tone="cyan" :title="{ en: 'Center', zh: '中央面板', ja: '中央パネル', ko: '중앙 패널', fr: 'Centre', de: 'Zentral', es: 'Centro', pt: 'Centro' }" :body="{ en: 'Chat with streaming, tool cards, approval prompts.', zh: '流式聊天、工具卡片、审批提示。', ja: 'ストリーミングチャット、ツールカード、承認プロンプト。', ko: '스트리밍 채팅, 도구 카드, 승인 프롬프트.', fr: 'Chat en streaming, cartes d’outils, invites d’approbation.', de: 'Streaming-Chat, Tool-Karten, Genehmigungsdialoge.', es: 'Chat en streaming, tarjetas de herramientas, aprobaciones.', pt: 'Chat em streaming, cards de ferramentas, aprovações.' }" />

<DeckMiniPanel neutral tone="purple" :title="{ en: 'Right Panel', zh: '右侧面板', ja: '右パネル', ko: '우측 패널', fr: 'Panneau droit', de: 'Rechtes Panel', es: 'Panel derecho', pt: 'Painel direito' }" :body="{ en: 'Progress tracking and artifact browser.', zh: '进度追踪和产物浏览。', ja: '進捗追跡とアーティファクトブラウザ。', ko: '진행 상황 추적 및 아티팩트 브라우저.', fr: 'Suivi de progression et navigateur d’artefacts.', de: 'Fortschrittsverfolgung und Artefakt-Browser.', es: 'Seguimiento de progreso y explorador de artefactos.', pt: 'Acompanhamento de progresso e navegador de artefatos.' }" />

---

## layout: split-media

# ⚡ {{ $t({ en: 'Multi-Session in Action', zh: '多会话实战', ja: 'マルチセッション実践', ko: '멀티 세션 실전', fr: 'Multi-session en action', de: 'Multi-Sitzung in Aktion', es: 'Multisesión en acción', pt: 'Multissessão em ação' }) }}

<div class="cw-kicker">{{ $t({ en: 'Three tasks running in parallel. Each with isolated context.', zh: '三个任务并行运行。各自独立上下文。', ja: '3つのタスクが並列実行。各自独立したコンテキスト。', ko: '3개 태스크가 병렬 실행. 각각 독립된 컨텍스트.', fr: 'Trois tâches en parallèle. Chacune avec son contexte isolé.', de: 'Drei Aufgaben parallel. Jeweils mit isoliertem Kontext.', es: 'Tres tareas en paralelo. Cada una con contexto aislado.', pt: 'Três tarefas em paralelo. Cada uma com contexto isolado.' }) }}</div>

::left::

<img src="/images/multi-session-parallel.png" class="cw-shot cw-shot--panel" alt="Three tasks running in parallel" />

::right::

<DeckMiniStatRow tone="green" :text="{ en: 'Status badges: running, idle, done', zh: '状态徽章：运行中、空闲、完成', ja: 'ステータスバッジ：実行中、待機、完了', ko: '상태 배지: 실행 중, 대기, 완료', fr: 'Badges d’état : en cours, inactif, terminé', de: 'Status-Badges: laufend, idle, fertig', es: 'Insignias de estado: en ejecución, inactivo, terminado', pt: 'Badges de status: executando, inativo, concluído' }" />
<DeckMiniStatRow tone="cyan" :text="{ en: 'Animated spinners for active sessions', zh: '活跃会话的动画指示器', ja: 'アクティブセッションのアニメーションスピナー', ko: '활성 세션용 애니메이션 스피너', fr: 'Spinners animés pour les sessions actives', de: 'Animierte Spinner für aktive Sitzungen', es: 'Spinners animados para sesiones activas', pt: 'Spinners animados para sessões ativas' }" />
<DeckMiniStatRow tone="purple" :text="{ en: 'Unread indicators per task', zh: '每个任务的未读提示', ja: 'タスクごとの未読インジケーター', ko: '태스크별 미읽음 표시', fr: 'Indicateurs non lus par tâche', de: 'Ungelesen-Anzeige pro Aufgabe', es: 'Indicadores no leídos por tarea', pt: 'Indicadores de não lido por tarefa' }" />
<DeckMiniStatRow tone="yellow" :text="{ en: 'Relative timestamps', zh: '相对时间戳', ja: '相対タイムスタンプ', ko: '상대 타임스탬프', fr: 'Horodatages relatifs', de: 'Relative Zeitstempel', es: 'Marcas de tiempo relativas', pt: 'Timestamps relativos' }" />

---

# 📂 {{ $t({ en: 'File Management', zh: '文件管理', ja: 'ファイル管理', ko: '파일 관리', fr: 'Gestion de fichiers', de: 'Dateiverwaltung', es: 'Gestión de archivos', pt: 'Gestão de ficheiros' }) }}

<div class="cw-kicker">{{ $t({ en: 'Every file the Agent produces, automatically collected.', zh: 'Agent 产出的每一个文件，自动收集。', ja: 'Agent が生成するすべてのファイルを自動収集。', ko: 'Agent가 생성하는 모든 파일을 자동 수집.', fr: 'Chaque fichier produit par l’Agent, automatiquement collecté.', de: 'Jede vom Agent erzeugte Datei, automatisch gesammelt.', es: 'Cada archivo que produce el Agent, recopilado automáticamente.', pt: 'Cada arquivo produzido pelo Agent, coletado automaticamente.' }) }}</div>

<div class="cw-split--media mt-6">
  <div class="flex flex-col gap-3">
    <h3 class="cw-panel-title cw-tone-green">{{ $t({ en: 'File Browser', zh: '文件浏览器', ja: 'ファイルブラウザ', ko: '파일 브라우저', fr: 'Navigateur de fichiers', de: 'Dateibrowser', es: 'Explorador de archivos', pt: 'Navegador de arquivos' }) }}</h3>
    <img src="/images/file-browser.png" class="cw-shot cw-shot--browser" alt="Artifact file browser" />
  </div>

  <div class="flex flex-col gap-3">
    <h3 class="cw-panel-title cw-tone-green">{{ $t({ en: 'Features', zh: '功能特性', ja: '機能', ko: '기능', fr: 'Fonctionnalités', de: 'Funktionen', es: 'Funciones', pt: 'Funcionalidades' }) }}</h3>
    <ul class="cw-bullets">
      <li>{{ $t({ en: 'Grid layout with type badges', zh: '网格布局与类型徽章', ja: 'タイプバッジ付きグリッドレイアウト', ko: '타입 배지가 포함된 그리드 레이아웃', fr: 'Disposition grille avec badges de type', de: 'Rasterlayout mit Typ-Badges', es: 'Diseño en cuadrícula con insignias de tipo', pt: 'Layout em grade com badges de tipo' }) }}</li>
      <li>{{ $t({ en: 'Filter by task, sort by date, name, or type', zh: '按任务筛选，按日期、名称或类型排序', ja: 'タスクで絞込、日付・名前・タイプで並替', ko: '태스크별 필터, 날짜·이름·타입별 정렬', fr: 'Filtrer par tâche, trier par date, nom ou type', de: 'Nach Aufgabe filtern, nach Datum, Name oder Typ sortieren', es: 'Filtrar por tarea, ordenar por fecha, nombre o tipo', pt: 'Filtrar por tarefa, ordenar por data, nome ou tipo' }) }}</li>
      <li>{{ $t({ en: 'Full-text search with highlighted snippets', zh: '全文搜索与高亮片段', ja: 'ハイライト付き全文検索', ko: '하이라이트가 포함된 전문 검색', fr: 'Recherche plein texte avec extraits surlignés', de: 'Volltextsuche mit hervorgehobenen Snippets', es: 'Búsqueda de texto completo con fragmentos resaltados', pt: 'Busca textual com trechos destacados' }) }}</li>
      <li>{{ $t({ en: 'Each artifact links back to its source message', zh: '每个产物都能回链到源消息', ja: '各アーティファクトがソースメッセージにリンク', ko: '각 아티팩트가 원본 메시지에 연결', fr: 'Chaque artefact renvoie à son message source', de: 'Jedes Artefakt verlinkt zum Quellnachricht', es: 'Cada artefacto enlaza a su mensaje de origen', pt: 'Cada artefato vincula à mensagem de origem' }) }}</li>
      <li>{{ $t({ en: 'Per-task artifact list in the right panel', zh: '右侧面板显示任务产物列表', ja: '右パネルにタスクごとのアーティファクト一覧', ko: '우측 패널에 태스크별 아티팩트 목록', fr: 'Liste d’artefacts par tâche dans le panneau droit', de: 'Artefakt-Liste pro Aufgabe im rechten Panel', es: 'Lista de artefactos por tarea en el panel derecho', pt: 'Lista de artefatos por tarefa no painel direito' }) }}</li>
    </ul>
    <div class="cw-note-panel" data-tone="green">
      <p class="cw-note-copy" v-html="$t({ en: '<strong>No copy-paste.</strong> No more wondering where the file went. It is all here.', zh: '<strong>告别复制粘贴。</strong> 不再纠结文件到底去哪了。它都在这里。', ja: '<strong>コピペ不要。</strong>ファイルの行方に悩む必要はもうありません。すべてここに。', ko: '<strong>복사-붙여넣기 불필요.</strong> 파일이 어디 갔는지 고민할 필요 없습니다. 모두 여기에.', fr: '<strong>Fini le copier-coller.</strong> Plus besoin de chercher où est passé le fichier. Tout est ici.', de: '<strong>Kein Copy-Paste.</strong> Nie mehr fragen, wo die Datei hin ist. Alles hier.', es: '<strong>Sin copiar-pegar.</strong> No más preguntarse dónde fue el archivo. Todo está aquí.', pt: '<strong>Sem copiar-colar.</strong> Sem mais dúvidas sobre onde o arquivo foi parar. Tudo aqui.' })"></p>
    </div>
  </div>
</div>

---

# 📊 {{ $t({ en: 'Task Progress Tracking', zh: '任务进度追踪', ja: 'タスク進捗追跡', ko: '태스크 진행 추적', fr: 'Suivi de progression des tâches', de: 'Aufgaben-Fortschrittsverfolgung', es: 'Seguimiento de progreso de tareas', pt: 'Acompanhamento de progresso de tarefas' }) }}

<DeckTaskProgressSlide />

---

layout: split-media
gap: mt-6

---

# 🧠 {{ $t({ en: 'Token & Context Awareness', zh: 'Token 与上下文感知', ja: 'Token とコンテキスト管理', ko: 'Token 및 컨텍스트 인식', fr: 'Gestion Token et contexte', de: 'Token- & Kontext-Bewusstsein', es: 'Gestión de Token y contexto', pt: 'Gestão de Token e contexto' }) }}

<div class="cw-kicker">{{ $t({ en: 'You always know how much runway you have.', zh: '你始终知道还剩多少空间。', ja: '残りの余裕が常にわかる。', ko: '남은 여유가 항상 보입니다.', fr: 'Vous savez toujours combien de marge il vous reste.', de: 'Sie wissen immer, wie viel Spielraum noch bleibt.', es: 'Siempre sabes cuánto margen te queda.', pt: 'Você sempre sabe quanto espaço resta.' }) }}</div>

::left::

<img src="/images/token-usage.png" class="cw-shot cw-shot--browser" alt="Token usage dashboard" />

::right::

<ul class="cw-bullets">
  <li>{{ $t({ en: 'Chat header shows real-time token counts for input and output', zh: '聊天头部实时显示输入与输出 Token 计数', ja: 'チャットヘッダーに入出力 Token 数をリアルタイム表示', ko: '채팅 헤더에 입출력 Token 수 실시간 표시', fr: 'L’en-tête du chat affiche les compteurs Token en temps réel', de: 'Chat-Header zeigt Echtzeit-Token-Zähler für Ein-/Ausgabe', es: 'El encabezado del chat muestra contadores de Token en tiempo real', pt: 'O cabeçalho do chat mostra contadores de Token em tempo real' }) }}</li>
  <li>{{ $t({ en: 'Context usage bar with color thresholds', zh: '上下文用量条带颜色阈值', ja: 'カラー閾値付きコンテキスト使用量バー', ko: '색상 임계값이 있는 컨텍스트 사용량 바', fr: 'Barre d’utilisation du contexte avec seuils de couleur', de: 'Kontext-Nutzungsbalken mit Farbschwellen', es: 'Barra de uso de contexto con umbrales de color', pt: 'Barra de uso de contexto com limites de cor' }) }}</li>
  <li>{{ $t({ en: 'Cost displayed in real currency, not abstract credits', zh: '费用以真实货币显示，而非抽象积分', ja: '抽象的なクレジットではなく実通貨でコスト表示', ko: '추상적 크레딧이 아닌 실제 통화로 비용 표시', fr: 'Coût affiché en monnaie réelle, pas en crédits abstraits', de: 'Kosten in Echtgeld, nicht in abstrakten Credits', es: 'Costo mostrado en moneda real, no en créditos abstractos', pt: 'Custo exibido em moeda real, não créditos abstratos' }) }}</li>
  <li>{{ $t({ en: 'Rate limit status with progress bars', zh: '速率限制状态配合进度条展示', ja: 'レート制限ステータスとプログレスバー', ko: '속도 제한 상태와 프로그레스 바', fr: 'État de limite de débit avec barres de progression', de: 'Rate-Limit-Status mit Fortschrittsbalken', es: 'Estado de límite de tasa con barras de progreso', pt: 'Status de limite de taxa com barras de progresso' }) }}</li>
  <li>{{ $t({ en: 'Expandable thinking process viewer', zh: '可展开的思考过程查看器', ja: '展開可能な思考プロセスビューア', ko: '펼칠 수 있는 사고 과정 뷰어', fr: 'Visualiseur de processus de réflexion extensible', de: 'Aufklappbarer Denkprozess-Viewer', es: 'Visor de proceso de pensamiento expandible', pt: 'Visualizador de processo de raciocínio expansível' }) }}</li>
</ul>

<div class="cw-note-panel" data-tone="green">
  <p class="cw-note-copy" v-html="$t({ en: '<strong>Transparency is not a feature.</strong> It is respect for the user.', zh: '<strong>透明不是功能。</strong> 它是对用户的尊重。', ja: '<strong>透明性は機能ではない。</strong>ユーザーへの敬意である。', ko: '<strong>투명성은 기능이 아닙니다.</strong> 사용자에 대한 존중입니다.', fr: '<strong>La transparence n’est pas une fonctionnalité.</strong> C’est du respect pour l’utilisateur.', de: '<strong>Transparenz ist kein Feature.</strong> Es ist Respekt gegenüber dem Nutzer.', es: '<strong>La transparencia no es una función.</strong> Es respeto al usuario.', pt: '<strong>Transparência não é uma funcionalidade.</strong> É respeito ao usuário.' })"></p>
</div>

---

# 🧩 {{ $t({ en: 'Feature Matrix', zh: '功能大全', ja: '機能一覧', ko: '기능 매트릭스', fr: 'Matrice de fonctionnalités', de: 'Funktionsmatrix', es: 'Matriz de funciones', pt: 'Matriz de funcionalidades' }) }}

<div class="cw-kicker">{{ $t({ en: 'Everything that has shipped. At a glance.', zh: '已经发布的一切。一目了然。', ja: '出荷済みの全機能。一目で。', ko: '출시된 모든 기능. 한눈에.', fr: 'Tout ce qui a été livré. En un coup d’œil.', de: 'Alles, was ausgeliefert wurde. Auf einen Blick.', es: 'Todo lo que ya se ha entregado. De un vistazo.', pt: 'Tudo o que já foi entregue. Num olhar.' }) }}</div>

<DeckFeatureMatrixSlide />

---

## layout: split-media

# 🧩 {{ $t({ en: 'Skills & ClawHub', zh: 'Skills 与 ClawHub', ja: 'Skills と ClawHub', ko: 'Skills & ClawHub', fr: 'Skills & ClawHub', de: 'Skills & ClawHub', es: 'Skills y ClawHub', pt: 'Skills e ClawHub' }) }}

<div class="cw-kicker">{{ $t({ en: 'Atomic capabilities. Discover, install, configure.', zh: '原子能力。发现、安装、配置。', ja: 'アトミックな能力。発見・インストール・設定。', ko: '원자 능력. 발견, 설치, 설정.', fr: 'Capacités atomiques. Découvrir, installer, configurer.', de: 'Atomare Fähigkeiten. Entdecken, installieren, konfigurieren.', es: 'Capacidades atómicas. Descubre, instala, configura.', pt: 'Capacidades atômicas. Descubra, instale, configure.' }) }}</div>

::left::

<img src="/images/skills.png" class="cw-shot cw-shot--panel" alt="Skills settings" />

::right::

<DeckMiniPanel tone="green" :title="{ en: 'Skill', zh: 'Skill', ja: 'Skill', ko: 'Skill', fr: 'Skill', de: 'Skill', es: 'Skill', pt: 'Skill' }" :body="{ en: 'Reusable capability fragment. Extends what an Agent can do.', zh: '可复用的能力片段。扩展 Agent 的工具箱。', ja: '再利用可能な能力断片。Agent のツールボックスを拡張。', ko: '재사용 능력 조각. Agent 도구 상자를 확장.', fr: 'Fragment réutilisable. Étend la boîte à outils.', de: 'Wiederverwendbares Fragment. Erweitert die Toolbox.', es: 'Fragmento reutilizable. Amplía la caja de herramientas.', pt: 'Fragmento reutilizável. Expande a caixa de ferramentas.' }" />

<DeckMiniPanel tone="cyan" :title="{ en: 'ClawHub', zh: 'ClawHub', ja: 'ClawHub', ko: 'ClawHub', fr: 'ClawHub', de: 'ClawHub', es: 'ClawHub', pt: 'ClawHub' }" :body="{ en: 'An app store for agent skills. One click adds the capability.', zh: 'Agent 能力的应用商店。一键添加新技能。', ja: 'Agent 能力のアプリストア。ワンクリックで追加。', ko: 'Agent 능력의 앱스토어. 원클릭 설치.', fr: 'App store pour skills. Un clic suffit.', de: 'App Store für Skills. Ein Klick genügt.', es: 'Tienda de skills. Un clic.', pt: 'Loja de skills. Um clique.' }" />

<DeckMiniPanel tone="purple" :title="{ en: 'Schema-Driven', zh: 'Schema 驱动', ja: 'スキーマ駆動', ko: '스키마 기반', fr: 'Guidé par schéma', de: 'Schema-basiert', es: 'Por esquema', pt: 'Por schema' }" :body="{ en: 'Skills self-describe their config. The UI generates the form.', zh: 'Skill 自描述配置，UI 自动生成表单。', ja: 'Skill が設定を記述。UI が自動生成。', ko: 'Skill이 설정 기술. UI가 폼 자동 생성.', fr: 'Les skills décrivent leur config. UI auto-générée.', de: 'Skills beschreiben sich selbst. UI wird generiert.', es: 'Los skills se describen. UI generada.', pt: 'Skills se descrevem. UI gerada.' }" />

---

## layout: split-media

# 🤖 {{ $t({ en: 'Agent Manager', zh: 'Agent 管理', ja: 'Agent マネージャー', ko: 'Agent 매니저', fr: 'Gestionnaire d’Agent', de: 'Agent-Verwaltung', es: 'Gestor de Agent', pt: 'Gerenciador de Agent' }) }}

<div class="cw-kicker">{{ $t({ en: 'All your agents in one place. Edit anything in-app.', zh: '所有 Agent 一处管理。所有配置产品内编辑。', ja: 'すべての Agent を一箇所で管理。すべての設定をアプリ内で編集。', ko: '모든 Agent를 한곳에서 관리. 모든 설정을 앱 내에서 편집.', fr: 'Tous vos agents au même endroit. Tout éditable dans l’app.', de: 'Alle Agents an einem Ort. Alles in der App bearbeitbar.', es: 'Todos tus agents en un solo lugar. Todo editable en la app.', pt: 'Todos os seus agents em um só lugar. Tudo editável no app.' }) }}</div>

::left::

<img src="/images/agents-list.png" class="cw-shot cw-shot--panel" alt="Agents list" />

::right::

<ul class="cw-bullets">
  <li v-html="$t({ en: '<strong>One panel</strong>: every Agent, every Skill, every status', zh: '<strong>一个面板</strong>：所有 Agent、所有 Skill、所有状态', ja: '<strong>1つのパネル</strong>：すべての Agent、Skill、ステータス', ko: '<strong>하나의 패널</strong>: 모든 Agent, Skill, 상태', fr: '<strong>Un seul panneau</strong> : chaque Agent, chaque Skill, chaque statut', de: '<strong>Ein Panel</strong>: jeder Agent, jeder Skill, jeder Status', es: '<strong>Un panel</strong>: cada Agent, cada Skill, cada estado', pt: '<strong>Um painel</strong>: cada Agent, cada Skill, cada status' })"></li>
  <li v-html="$t({ en: '<strong>Inline file editor</strong>: edit <code>AGENTS.md</code> and skill configs without leaving the app', zh: '<strong>内联文件编辑器</strong>：无需离开产品就能编辑 <code>AGENTS.md</code> 和 Skill 配置', ja: '<strong>インラインファイル編集</strong>：アプリを離れずに <code>AGENTS.md</code> や Skill 設定を編集', ko: '<strong>인라인 파일 편집</strong>: 앱을 벗어나지 않고 <code>AGENTS.md</code>와 Skill 설정 편집', fr: '<strong>Éditeur inline</strong> : modifiez <code>AGENTS.md</code> et les configs de skill sans quitter l’app', de: '<strong>Inline-Datei-Editor</strong>: <code>AGENTS.md</code> und Skill-Configs ohne App-Wechsel editieren', es: '<strong>Editor inline</strong>: edita <code>AGENTS.md</code> y configs de skill sin salir de la app', pt: '<strong>Editor inline</strong>: edite <code>AGENTS.md</code> e configs de skill sem sair do app' })"></li>
  <li v-html="$t({ en: '<strong>Custom avatars</strong> via <code>clawwork-avatar://</code> protocol', zh: '<strong>自定义头像</strong>，走 <code>clawwork-avatar://</code> 协议', ja: '<strong>カスタムアバター</strong>：<code>clawwork-avatar://</code> プロトコル', ko: '<strong>커스텀 아바타</strong>: <code>clawwork-avatar://</code> 프로토콜', fr: '<strong>Avatars personnalisés</strong> via le protocole <code>clawwork-avatar://</code>', de: '<strong>Eigene Avatare</strong> über <code>clawwork-avatar://</code>-Protokoll', es: '<strong>Avatares personalizados</strong> vía <code>clawwork-avatar://</code>', pt: '<strong>Avatares customizados</strong> via protocolo <code>clawwork-avatar://</code>' })"></li>
  <li v-html="$t({ en: '<strong>Skills status</strong>: see at a glance which skills are enabled per Agent', zh: '<strong>Skill 状态</strong>：一眼看清每个 Agent 启用了哪些 Skill', ja: '<strong>Skill ステータス</strong>：Agent ごとに有効な Skill が一目でわかる', ko: '<strong>Skill 상태</strong>: Agent별 활성화된 Skill을 한눈에', fr: '<strong>Statut Skills</strong> : les skills activés par Agent en un coup d’œil', de: '<strong>Skills-Status</strong>: aktivierte Skills pro Agent auf einen Blick', es: '<strong>Estado de Skills</strong>: skills activos por Agent de un vistazo', pt: '<strong>Status de Skills</strong>: veja num olhar quais skills estão ativos por Agent' })"></li>
</ul>

---

## layout: split-media

# 🧙 {{ $t({ en: 'Agent Builder', zh: 'Agent 构建器', ja: 'Agent ビルダー', ko: 'Agent 빌더', fr: 'Agent Builder', de: 'Agent-Builder', es: 'Agent Builder', pt: 'Agent Builder' }) }}

<div class="cw-kicker">{{ $t({ en: 'Talk your way to a new Agent.', zh: '对话即可创建新 Agent。', ja: '対話で新しい Agent を作成。', ko: '대화로 새 Agent 생성.', fr: 'Créez un Agent en conversation.', de: 'Einen Agent per Gespräch erstellen.', es: 'Crea un Agent conversando.', pt: 'Crie um Agent conversando.' }) }}</div>

::left::

<img src="/images/agent-builder.png" class="cw-shot cw-shot--panel" alt="Agent Builder dialog" />

::right::

<ul class="cw-bullets">
  <li v-html="$t({ en: '<strong>Describe</strong> what the Agent should do — natural language', zh: '<strong>描述</strong> Agent 应该做什么 —— 自然语言', ja: '<strong>説明する</strong> Agent の役割を —— 自然言語で', ko: '<strong>설명</strong> Agent가 할 일을 —— 자연어로', fr: '<strong>Décrivez</strong> ce que l’Agent doit faire — en langage naturel', de: '<strong>Beschreibe</strong>, was der Agent tun soll — natürliche Sprache', es: '<strong>Describe</strong> qué debe hacer el Agent — lenguaje natural', pt: '<strong>Descreva</strong> o que o Agent deve fazer — linguagem natural' })"></li>
  <li v-html="$t({ en: '<strong>ClawWork drafts</strong> the <code>AGENT.md</code>, picks Skills, sets the model', zh: '<strong>ClawWork 起草</strong> <code>AGENT.md</code>，选择 Skill，设定模型', ja: '<strong>ClawWork が下書き</strong>：<code>AGENT.md</code>、Skill 選択、モデル設定', ko: '<strong>ClawWork가 초안 작성</strong>: <code>AGENT.md</code>, Skill 선택, 모델 설정', fr: '<strong>ClawWork ébauche</strong> le <code>AGENT.md</code>, choisit les Skills, fixe le modèle', de: '<strong>ClawWork entwirft</strong> <code>AGENT.md</code>, wählt Skills, setzt das Modell', es: '<strong>ClawWork redacta</strong> el <code>AGENT.md</code>, elige Skills, fija el modelo', pt: '<strong>ClawWork rascunha</strong> o <code>AGENT.md</code>, escolhe Skills, define o modelo' })"></li>
  <li v-html="$t({ en: '<strong>Tweak inline</strong> before saving — every field is editable', zh: '<strong>保存前内联微调</strong> —— 每个字段都可编辑', ja: '<strong>保存前にインライン調整</strong> —— すべてのフィールドが編集可能', ko: '<strong>저장 전 인라인 조정</strong> —— 모든 필드 편집 가능', fr: '<strong>Affinez inline</strong> avant de sauvegarder — chaque champ est éditable', de: '<strong>Inline anpassen</strong> vor dem Speichern — jedes Feld ist editierbar', es: '<strong>Ajusta inline</strong> antes de guardar — cada campo es editable', pt: '<strong>Ajuste inline</strong> antes de salvar — cada campo é editável' })"></li>
  <li v-html="$t({ en: '<strong>Save</strong> — Agent appears in the manager, ready for tasks', zh: '<strong>保存</strong> —— Agent 出现在管理面板，准备接任务', ja: '<strong>保存</strong> —— Agent がマネージャーに出現、タスク準備完了', ko: '<strong>저장</strong> —— Agent가 매니저에 나타나 태스크 준비 완료', fr: '<strong>Sauvegardez</strong> — l’Agent apparaît dans le manager, prêt pour les tâches', de: '<strong>Speichern</strong> — Agent erscheint im Manager, bereit für Aufgaben', es: '<strong>Guarda</strong> — el Agent aparece en el manager, listo para tareas', pt: '<strong>Salve</strong> — o Agent aparece no manager, pronto para tarefas' })"></li>
</ul>

---

## layout: split-media

# 🧬 {{ $t({ en: 'ClawWork Teams', zh: 'ClawWork Teams', ja: 'ClawWork Teams', ko: 'ClawWork Teams', fr: 'ClawWork Teams', de: 'ClawWork Teams', es: 'ClawWork Teams', pt: 'ClawWork Teams' }) }}

<div class="cw-kicker" v-html="$t({ en: 'A self-contained multi-agent unit. Roles, skills, workflow — packaged together.', zh: '一个自包含的多 Agent 单元。角色、技能、工作流 —— 打包在一起。', ja: '自己完結型のマルチエージェントユニット。ロール、スキル、ワークフローを一括パッケージ。', ko: '자체 완결 멀티 에이전트 단위. 역할, 스킬, 워크플로를 한 번에 패키지화.', fr: 'Une unité multi-agent autonome. Rôles, skills, workflow — empaquetés ensemble.', de: 'Eine eigenständige Multi-Agent-Einheit. Rollen, Skills, Workflow — gemeinsam verpackt.', es: 'Una unidad multi-agente autónoma. Roles, skills, workflow — empaquetados juntos.', pt: 'Uma unidade multi-agente autossuficiente. Papéis, skills, workflow — empacotados juntos.' })"></div>

::left::

<img src="/images/team-details.png" class="cw-shot cw-shot--panel" alt="Team details" />

::right::

<ul class="cw-bullets">
  <li v-html="$t({ en: '<code>TEAM.md</code> — team goals and orchestration workflow', zh: '<code>TEAM.md</code> — 团队目标与编排工作流', ja: '<code>TEAM.md</code> — チーム目標と編排ワークフロー', ko: '<code>TEAM.md</code> — 팀 목표와 오케스트레이션 워크플로', fr: '<code>TEAM.md</code> — objectifs et workflow d’orchestration', de: '<code>TEAM.md</code> — Teamziele und Orchestrierungs-Workflow', es: '<code>TEAM.md</code> — objetivos y flujo de orquestación', pt: '<code>TEAM.md</code> — objetivos e workflow de orquestração' })"></li>
  <li v-html="$t({ en: '<code>AGENT.md</code> — role, skills, and tools per agent', zh: '<code>AGENT.md</code> — 每个 Agent 的角色、技能与工具', ja: '<code>AGENT.md</code> — エージェントごとのロール、スキル、ツール', ko: '<code>AGENT.md</code> — 에이전트별 역할, 스킬, 도구', fr: '<code>AGENT.md</code> — rôle, compétences et outils par agent', de: '<code>AGENT.md</code> — Rolle, Skills und Tools pro Agent', es: '<code>AGENT.md</code> — rol, habilidades y herramientas por agente', pt: '<code>AGENT.md</code> — papel, habilidades e ferramentas por agente' })"></li>
  <li v-html="$t({ en: '<code>SOUL.md</code> — personality and communication style', zh: '<code>SOUL.md</code> — 性格与沟通风格', ja: '<code>SOUL.md</code> — 性格とコミュニケーションスタイル', ko: '<code>SOUL.md</code> — 성격과 커뮤니케이션 스타일', fr: '<code>SOUL.md</code> — personnalité et style de communication', de: '<code>SOUL.md</code> — Persönlichkeit und Kommunikationsstil', es: '<code>SOUL.md</code> — personalidad y estilo de comunicación', pt: '<code>SOUL.md</code> — personalidade e estilo de comunicação' })"></li>
</ul>

<div class="cw-note-panel mt-4" data-tone="green">
  <p class="cw-note-copy" v-html="$t({ en: '<strong>No manual setup.</strong> ClawWork handles agent creation, skill installation, and model assignment for you.', zh: '<strong>无需手动配置。</strong>ClawWork 替你完成 Agent 创建、Skill 安装和模型分配。', ja: '<strong>手動セットアップ不要。</strong>ClawWork がエージェント作成、スキルインストール、モデル割当を処理。', ko: '<strong>수동 설정 불필요.</strong> ClawWork가 에이전트 생성, 스킬 설치, 모델 할당을 처리합니다.', fr: '<strong>Aucune configuration manuelle.</strong> ClawWork gère la création d’agents, l’installation de compétences et l’attribution de modèles.', de: '<strong>Kein manuelles Setup.</strong> ClawWork übernimmt Agent-Erstellung, Skill-Installation und Modellzuweisung.', es: '<strong>Sin configuración manual.</strong> ClawWork gestiona la creación de agentes, instalación de habilidades y asignación de modelos.', pt: '<strong>Sem configuração manual.</strong> ClawWork cuida da criação de agentes, instalação de habilidades e atribuição de modelos.' })"></p>
</div>

---

## layout: split-media

# 🎯 {{ $t({ en: 'Teams in Action', zh: 'Team 实战', ja: 'チーム実践', ko: '팀 실전', fr: 'Teams en action', de: 'Teams in Aktion', es: 'Teams en acción', pt: 'Teams em ação' }) }}

<div class="cw-kicker">{{ $t({ en: 'From concept to running agents. Every step inside ClawWork.', zh: '从概念到运行。每一步都在 ClawWork 里。', ja: 'コンセプトから実行まで。すべての手順が ClawWork 内で。', ko: '컨셉에서 실행까지. 모든 단계가 ClawWork 안에.', fr: 'Du concept à l’exécution. Chaque étape dans ClawWork.', de: 'Vom Konzept zum laufenden Agent. Jeder Schritt in ClawWork.', es: 'Del concepto a la ejecución. Cada paso dentro de ClawWork.', pt: 'Do conceito à execução. Cada passo dentro do ClawWork.' }) }}</div>

::left::

<img src="/images/team-builder.png" class="cw-shot cw-shot--panel" alt="Team Builder wizard" />

::right::

<DeckMiniPanel tone="purple" :title="{ en: 'AI Team Builder', zh: 'AI Team 构建器', ja: 'AI チームビルダー', ko: 'AI 팀 빌더', fr: 'AI Team Builder', de: 'KI-Team-Builder', es: 'AI Team Builder', pt: 'AI Team Builder' }" :body="{ en: 'Natural language → roles, skills, workflow.', zh: '自然语言 → 角色、技能、工作流。', ja: '自然言語 → ロール・スキル・ワークフロー。', ko: '자연어 → 역할·스킬·워크플로.', fr: 'Langage naturel → rôles, skills, workflow.', de: 'Natürliche Sprache → Rollen, Skills, Workflow.', es: 'Lenguaje natural → roles, skills, workflow.', pt: 'Linguagem natural → papéis, skills, workflow.' }" />

<DeckMiniPanel tone="green" :title="{ en: 'Inline File Tree', zh: '内联文件树', ja: 'インラインファイルツリー', ko: '인라인 파일 트리', fr: 'Arbre de fichiers inline', de: 'Inline-Dateibaum', es: 'Árbol inline', pt: 'Árvore inline' }" :body="{ en: 'Edit TEAM/AGENT/SOUL.md inside the app.', zh: '在产品内直接编辑 TEAM/AGENT/SOUL.md。', ja: 'TEAM/AGENT/SOUL.md をアプリ内で編集。', ko: 'TEAM/AGENT/SOUL.md을 앱 내에서 편집.', fr: 'Éditez TEAM/AGENT/SOUL.md dans l’app.', de: 'TEAM/AGENT/SOUL.md in der App editieren.', es: 'Edita TEAM/AGENT/SOUL.md en la app.', pt: 'Edite TEAM/AGENT/SOUL.md no app.' }" />

<DeckMiniPanel tone="cyan" :title="{ en: 'Team Chat Room', zh: '团队聊天室', ja: 'チームチャットルーム', ko: '팀 채팅방', fr: 'Salon de chat', de: 'Team-Chatraum', es: 'Sala del equipo', pt: 'Sala do time' }" :body="{ en: 'Live avatar bar: who speaks, who executes.', zh: '实时头像栏：谁在说话、谁在执行。', ja: 'ライブアバターバー：発話者と実行者。', ko: '라이브 아바타 바: 발언자·실행자.', fr: 'Barre d’avatars : qui parle, qui exécute.', de: 'Live-Avatar-Leiste: wer spricht, wer ausführt.', es: 'Barra de avatares: quién habla y ejecuta.', pt: 'Barra de avatares: quem fala e executa.' }" />

---

## layout: split-media

# 🏪 {{ $t({ en: 'TeamsHub', zh: 'TeamsHub', ja: 'TeamsHub', ko: 'TeamsHub', fr: 'TeamsHub', de: 'TeamsHub', es: 'TeamsHub', pt: 'TeamsHub' }) }}

<div class="cw-kicker">{{ $t({ en: 'Git-native team marketplace.', zh: 'Git 原生团队市场。', ja: 'Git ネイティブのチームマーケット。', ko: 'Git 네이티브 팀 마켓플레이스.', fr: 'Marché d’équipes natif Git.', de: 'Git-nativer Team-Marktplatz.', es: 'Mercado de equipos nativo Git.', pt: 'Marketplace de times nativo Git.' }) }}</div>

::left::

<div class="cw-nest" data-tone="cyan">
  <div class="cw-nest-label">🏪 Git → Registry → Install</div>
  <div style="display:flex;flex-direction:column;gap:6px;">
    <div class="cw-nest" data-tone="purple">
      <div class="cw-nest-label">📦 github.com/org/team-pack</div>
    </div>
    <div class="cw-nest" data-tone="cyan">
      <div class="cw-nest-label">🔗 Registry URL</div>
      <div class="cw-nest-items">
        <span class="cw-nest-skill"><span class="cw-nest-dot" data-color="cyan"></span>community</span>
        <span class="cw-nest-skill"><span class="cw-nest-dot" data-color="purple"></span>private</span>
      </div>
    </div>
    <div class="cw-nest" data-tone="green">
      <div class="cw-nest-label">⚡ One-Click Install</div>
    </div>
  </div>
</div>

::right::

<DeckMiniPanel tone="cyan" :title="{ en: 'Git Native', zh: 'Git 原生', ja: 'Git ネイティブ', ko: 'Git 네이티브', fr: 'Natif Git', de: 'Git-nativ', es: 'Nativo Git', pt: 'Git nativo' }" :body="{ en: 'A Team is a Git repo. Share = push to GitHub. Subscribe = add a registry URL.', zh: 'Team 就是一个 Git 仓库。分享 = push 到 GitHub。订阅 = 添加一个 registry URL。', ja: 'Team は Git リポジトリ。共有 = GitHub に push。購読 = registry URL を追加。', ko: 'Team은 Git 저장소. 공유 = GitHub에 push. 구독 = registry URL 추가.', fr: 'Un Team est un repo Git. Partager = push sur GitHub. S’abonner = ajouter un registry.', de: 'Ein Team ist ein Git-Repo. Teilen = auf GitHub pushen. Abonnieren = Registry-URL hinzufügen.', es: 'Un Team es un repo Git. Compartir = push a GitHub. Suscribir = añadir un registry.', pt: 'Um Team é um repo Git. Compartilhar = push no GitHub. Assinar = adicionar um registry.' }" />

<DeckMiniPanel tone="green" :title="{ en: 'One-Click Install', zh: '一键安装', ja: 'ワンクリックインストール', ko: '원클릭 설치', fr: 'Installation en un clic', de: 'Ein-Klick-Installation', es: 'Instalación en un clic', pt: 'Instalação em um clique' }" :body="{ en: 'Install orchestrator handles agent creation, skill installation, and model binding automatically.', zh: '安装编排器自动处理 Agent 创建、Skill 安装和模型绑定。', ja: 'インストールオーケストレーターが Agent 作成、Skill インストール、モデルバインドを自動処理。', ko: '설치 오케스트레이터가 Agent 생성, Skill 설치, 모델 바인딩을 자동 처리.', fr: 'L’orchestrateur gère création d’agents, installation de skills et liaison de modèle automatiquement.', de: 'Der Installations-Orchestrator übernimmt Agent-Erstellung, Skill-Installation und Modell-Bindung automatisch.', es: 'El orquestador gestiona creación de agentes, instalación de skills y vinculación de modelo automáticamente.', pt: 'O orquestrador gerencia criação de agentes, instalação de skills e vinculação de modelo automaticamente.' }" />

<DeckMiniPanel tone="purple" :title="{ en: 'Multi-Source Registries', zh: '多源 Registry', ja: 'マルチソース Registry', ko: '멀티 소스 레지스트리', fr: 'Registres multi-sources', de: 'Multi-Source-Registries', es: 'Registries multi-fuente', pt: 'Registries multi-fonte' }" :body="{ en: 'Community, private, team. Add as many registries as you want — all Git-based.', zh: '社区、私有、团队。想加多少 registry 就加多少 —— 全部基于 Git。', ja: 'コミュニティ、プライベート、チーム。好きなだけ registry を追加 —— すべて Git ベース。', ko: '커뮤니티, 프라이빗, 팀. 원하는 만큼 registry 추가 — 모두 Git 기반.', fr: 'Communauté, privé, équipe. Ajoutez autant de registres que voulu — tous Git.', de: 'Community, privat, Team. So viele Registries wie du willst — alle Git-basiert.', es: 'Comunidad, privado, equipo. Añade tantos registries como quieras — todos en Git.', pt: 'Comunidade, privado, time. Adicione quantos registries quiser — todos em Git.' }" />

---

## layout: split-media

# 🎭 {{ $t({ en: 'Multi-Session Orchestration', zh: '多 Session 编排', ja: 'マルチセッション編排', ko: '멀티 세션 오케스트레이션', fr: 'Orchestration multi-session', de: 'Multi-Session-Orchestrierung', es: 'Orquestación multisesión', pt: 'Orquestração multissessão' }) }}

<div class="cw-kicker">{{ $t({ en: 'One Conductor. N Performers. Pure session primitives.', zh: '一个 Conductor，N 个 Performer。纯 session 原语编排。', ja: '1 Conductor、N Performer。純粋なセッションプリミティブ。', ko: '1 Conductor, N Performer. 순수 세션 프리미티브.', fr: 'Un Conductor. N Performers. Primitives de session pures.', de: 'Ein Conductor. N Performer. Reine Session-Primitive.', es: 'Un Conductor. N Performers. Primitivas de sesión puras.', pt: 'Um Conductor. N Performers. Primitivas de sessão puras.' }) }}</div>

::left::

<img src="/images/agents-list.png" class="cw-shot cw-shot--panel" alt="TaskRoom multi-agent orchestration" />

::right::

<DeckMiniPanel tone="purple" :title="{ en: 'Ensemble Task', zh: 'Ensemble Task', ja: 'Ensemble Task', ko: 'Ensemble Task', fr: 'Ensemble Task', de: 'Ensemble Task', es: 'Ensemble Task', pt: 'Ensemble Task' }" :body="{ en: '1 Conductor + N Performers. Extends 1 Task = 1 Session to multi-agent.', zh: '1 Conductor + N Performer。把 1 Task = 1 Session 扩展为多 Agent 协作。', ja: '1 Conductor + N Performer。1 Task = 1 Session をマルチエージェントに拡張。', ko: '1 Conductor + N Performer. 1 Task = 1 Session을 멀티 에이전트로 확장.', fr: '1 Conductor + N Performers. Étend 1 Task = 1 Session au multi-agent.', de: '1 Conductor + N Performer. Erweitert 1 Task = 1 Session zu Multi-Agent.', es: '1 Conductor + N Performers. Extiende 1 Task = 1 Session a multi-agente.', pt: '1 Conductor + N Performers. Estende 1 Task = 1 Session para multi-agente.' }" />

<DeckMiniPanel tone="green" :title="{ en: 'Serial & Parallel', zh: '串行与并行', ja: 'シリアル＆パラレル', ko: '직렬 & 병렬', fr: 'Série & parallèle', de: 'Seriell & Parallel', es: 'Serie & paralelo', pt: 'Série & paralelo' }" :body="{ en: 'timeout:30 for serial handoff. timeout:0 for parallel fan-out. No external workers.', zh: 'timeout:30 串行交接，timeout:0 并行扇出。无外部 worker。', ja: 'timeout:30 で直列ハンドオフ。timeout:0 で並列ファンアウト。外部ワーカーなし。', ko: 'timeout:30 직렬 핸드오프. timeout:0 병렬 팬아웃. 외부 워커 없음.', fr: 'timeout:30 pour le relais série. timeout:0 pour le fan-out parallèle. Pas de workers externes.', de: 'timeout:30 für serielle Übergabe. timeout:0 für parallelen Fan-out. Keine externen Worker.', es: 'timeout:30 para relevo serial. timeout:0 para fan-out paralelo. Sin workers externos.', pt: 'timeout:30 para handoff serial. timeout:0 para fan-out paralelo. Sem workers externos.' }" />

<DeckMiniPanel tone="cyan" :title="{ en: 'Isolated by Design', zh: '隔离即设计', ja: '設計による分離', ko: '설계에 의한 격리', fr: 'Isolé par conception', de: 'Isolation by Design', es: 'Aislado por diseño', pt: 'Isolado por design' }" :body="{ en: 'Write isolated by sessionKey. Read aggregated by taskId. @All summons all; live avatar bar shows who is active.', zh: '写入按 sessionKey 隔离，展示按 taskId 聚合。@All 召集全员，实时头像栏显示谁在活动。', ja: 'sessionKey で書込分離、taskId で読取集約。@All で全員召集、ライブアバターバーで活動者を表示。', ko: 'sessionKey로 쓰기 격리, taskId로 읽기 집계. @All로 전원 소환, 라이브 아바타 바로 활동자 표시.', fr: 'Écriture isolée par sessionKey, lecture agrégée par taskId. @All convoque tous ; barre d’avatars en direct.', de: 'Schreiben isoliert nach sessionKey, Lesen aggregiert nach taskId. @All ruft alle, Live-Avatar-Leiste zeigt Aktivität.', es: 'Escritura aislada por sessionKey, lectura agregada por taskId. @All convoca a todos; barra de avatares en vivo.', pt: 'Escrita isolada por sessionKey, leitura agregada por taskId. @All convoca todos; barra de avatares ao vivo.' }" />

---

## layout: split-media

# 📱 {{ $t({ en: 'ClawWork in Your Pocket', zh: 'ClawWork 装进口袋', ja: 'ClawWork をポケットに', ko: '주머니 속의 ClawWork', fr: 'ClawWork dans votre poche', de: 'ClawWork in der Tasche', es: 'ClawWork en tu bolsillo', pt: 'ClawWork no bolso' }) }}

<div class="cw-kicker">{{ $t({ en: 'Not remote control. A real mobile app.', zh: '不是远程控制，是真正的移动端 App。', ja: 'リモートコントロールではない。本物のモバイル App。', ko: '원격 제어가 아닌, 진짜 모바일 앱.', fr: 'Pas un contrôle à distance. Une vraie app mobile.', de: 'Keine Fernsteuerung. Eine echte Mobile-App.', es: 'No es control remoto. Una app móvil real.', pt: 'Não é controle remoto. Um app mobile de verdade.' }) }}</div>

::left::

<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
  <img src="/images/pwa.png" class="cw-shot cw-shot--hero" alt="ClawWork PWA mobile" />
</div>

::right::

<DeckMiniPanel tone="cyan" :title="{ en: 'Installable', zh: '可安装', ja: 'インストール可能', ko: '설치 가능', fr: 'Installable', de: 'Installierbar', es: 'Instalable', pt: 'Instalável' }" :body="{ en: 'Standalone mode. No browser UI. OLED dark.', zh: 'Standalone 模式，无浏览器 UI，OLED 深色。', ja: 'スタンドアロン。ブラウザ UI なし。OLED ダーク。', ko: '독립 모드. 브라우저 UI 없음. OLED 다크.', fr: 'Mode standalone. Sans UI navigateur. Sombre OLED.', de: 'Standalone. Keine Browser-UI. OLED-Dunkel.', es: 'Standalone. Sin UI de navegador. OLED oscuro.', pt: 'Standalone. Sem UI de browser. OLED escuro.' }" />

<DeckMiniPanel tone="green" :title="{ en: 'Offline First', zh: '离线优先', ja: 'オフライン優先', ko: '오프라인 우선', fr: 'Hors-ligne d’abord', de: 'Offline-First', es: 'Offline primero', pt: 'Offline primeiro' }" :body="{ en: 'Service Worker + IndexedDB. Browse history underground.', zh: 'Service Worker + IndexedDB。地铁里也能看历史。', ja: 'Service Worker + IndexedDB。地下鉄でも履歴閲覧。', ko: 'Service Worker + IndexedDB. 지하철에서도 이력 열람.', fr: 'Service Worker + IndexedDB. Historique dans le métro.', de: 'Service Worker + IndexedDB. Verlauf in der U-Bahn.', es: 'Service Worker + IndexedDB. Historial en el metro.', pt: 'Service Worker + IndexedDB. Histórico no metrô.' }" />

<DeckMiniPanel tone="red" :title="{ en: 'Independent Identity', zh: '独立身份', ja: '独立 ID', ko: '독립 신원', fr: 'Identité indépendante', de: 'Unabhängige Identität', es: 'Identidad independiente', pt: 'Identidade independente' }" :body="{ en: 'Ed25519 via WebCrypto. Private key never leaves the device.', zh: 'WebCrypto 生成 Ed25519。私钥永远不出设备。', ja: 'WebCrypto で Ed25519 生成。秘密鍵はデバイス外へ出ない。', ko: 'WebCrypto로 Ed25519 생성. 개인 키는 기기 밖으로 안 나감.', fr: 'Ed25519 via WebCrypto. Clé privée jamais hors appareil.', de: 'Ed25519 per WebCrypto. Private Key bleibt auf dem Gerät.', es: 'Ed25519 vía WebCrypto. Privada nunca sale del dispositivo.', pt: 'Ed25519 via WebCrypto. Privada nunca sai do dispositivo.' }" />

---

<div class="cw-grid"></div>
<div class="glow-orb glow-purple cw-pulse" style="top:-80px; right:25%;"></div>
<div class="glow-orb glow-cyan cw-pulse" style="bottom:-60px; left:30%;"></div>

<div class="cw-thanks-shell">
  <h1 class="cw-display-title">
    <span class="cw-shimmer">{{ $t({ en: 'One More Thing...', zh: 'One More Thing...', ja: 'One More Thing...', ko: 'One More Thing...', fr: 'One More Thing...', de: 'One More Thing...', es: 'One More Thing...', pt: 'One More Thing...' }) }}</span>
  </h1>
  <p class="cw-thanks-copy">{{ $t({ en: 'No window. Just start.', zh: '无需窗口，直接开始。', ja: 'ウィンドウ不要。すぐ開始。', ko: '창 없이 바로 시작.', fr: 'Pas de fenêtre. Démarrez.', de: 'Kein Fenster. Einfach starten.', es: 'Sin ventana. Empieza.', pt: 'Sem janela. Comece.' }) }}</p>
</div>

---

## layout: split-media

# ⌨️ {{ $t({ en: 'Quick Launch', zh: '快捷启动器', ja: 'クイックランチ', ko: '퀵 런치', fr: 'Quick Launch', de: 'Quick Launch', es: 'Quick Launch', pt: 'Quick Launch' }) }}

<div class="cw-kicker">{{ $t({ en: 'Alt+Space. Type. Done. Never open the main window.', zh: 'Alt+Space 呼出，输入，完成。无需打开主窗口。', ja: 'Alt+Space で呼出、入力、完了。メインウィンドウ不要。', ko: 'Alt+Space 호출, 입력, 완료. 메인 창 불필요.', fr: 'Alt+Espace. Tapez. Fait. Jamais ouvrir la fenêtre principale.', de: 'Alt+Leertaste. Tippen. Fertig. Nie das Hauptfenster öffnen.', es: 'Alt+Espacio. Escribe. Listo. Nunca abres la ventana principal.', pt: 'Alt+Espaço. Digite. Pronto. Nunca abre a janela principal.' }) }}</div>

::left::

<div class="cw-nest" data-tone="purple" style="padding: 18px;">
  <div class="cw-nest-label" style="font-size: 13px; margin-bottom: 14px; opacity: 0.8;">⌨️ Alt + Space · 680 × 72</div>
  <div style="background: rgba(0,0,0,0.55); border-radius: 10px; padding: 16px 18px; display: flex; align-items: center; gap: 14px; border: 1px solid rgba(139, 92, 246, 0.45); box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);">
    <span style="color: rgba(139, 92, 246, 0.9); font-size: 20px;">⌨</span>
    <span style="color: rgba(255,255,255,0.55); font-family: monospace; font-size: 14px;">What's on your mind?</span>
  </div>
  <div class="cw-nest-items" style="margin-top: 14px; justify-content: flex-end;">
    <span class="cw-nest-skill"><span class="cw-nest-dot" data-color="green"></span>Enter to start</span>
    <span class="cw-nest-skill"><span class="cw-nest-dot" data-color="yellow"></span>Esc to dismiss</span>
  </div>
</div>

::right::

<ul class="cw-bullets">
  <li v-html="$t({ en: '<strong>Global shortcut</strong>: <code>Alt+Space</code> by default, fully configurable', zh: '<strong>全局快捷键</strong>：默认 <code>Alt+Space</code>，完全可配置', ja: '<strong>グローバルショートカット</strong>：デフォルト <code>Alt+Space</code>、設定可能', ko: '<strong>전역 단축키</strong>: 기본값 <code>Alt+Space</code>, 완전 설정 가능', fr: '<strong>Raccourci global</strong> : <code>Alt+Space</code> par défaut, configurable', de: '<strong>Globaler Shortcut</strong>: Standard <code>Alt+Space</code>, konfigurierbar', es: '<strong>Atajo global</strong>: <code>Alt+Space</code> por defecto, configurable', pt: '<strong>Atalho global</strong>: <code>Alt+Space</code> por padrão, configurável' })"></li>
  <li v-html="$t({ en: '<strong>Spotlight-style overlay</strong>: 680 × 72, frameless, transparent, always on top', zh: '<strong>Spotlight 风格浮窗</strong>：680 × 72，无边框、透明、始终置顶', ja: '<strong>Spotlight 風オーバーレイ</strong>：680 × 72、フレームレス、透明、常時最前面', ko: '<strong>Spotlight 스타일 오버레이</strong>: 680 × 72, 프레임리스, 투명, 항상 위', fr: '<strong>Superposition style Spotlight</strong> : 680 × 72, sans cadre, transparente, toujours au-dessus', de: '<strong>Spotlight-artige Überlagerung</strong>: 680 × 72, rahmenlos, transparent, immer oben', es: '<strong>Overlay tipo Spotlight</strong>: 680 × 72, sin marco, transparente, siempre encima', pt: '<strong>Overlay estilo Spotlight</strong>: 680 × 72, sem moldura, transparente, sempre no topo' })"></li>
  <li v-html="$t({ en: '<strong>Cross-workspace</strong>: visible on every virtual desktop, even in fullscreen apps', zh: '<strong>跨虚拟桌面</strong>：在所有虚拟桌面可见，包括全屏应用', ja: '<strong>仮想デスクトップ横断</strong>：すべての仮想デスクトップで可視、フルスクリーンアプリでも', ko: '<strong>가상 데스크톱 통합</strong>: 모든 가상 데스크톱에서 보임, 풀스크린 앱 포함', fr: '<strong>Inter-bureau</strong> : visible sur tous les bureaux virtuels, même en plein écran', de: '<strong>Workspace-übergreifend</strong>: auf jedem virtuellen Desktop sichtbar, auch im Vollbild', es: '<strong>Entre escritorios</strong>: visible en todos los escritorios virtuales, incluso en pantalla completa', pt: '<strong>Entre workspaces</strong>: visível em todos os desktops virtuais, mesmo em tela cheia' })"></li>
  <li v-html="$t({ en: '<strong>Blur to dismiss</strong>: loses focus → hides automatically, no clutter', zh: '<strong>失焦即隐藏</strong>：丢失焦点自动隐藏，不留痕迹', ja: '<strong>フォーカスを失うと非表示</strong>：自動的に隠れ、混雑しない', ko: '<strong>포커스 잃으면 숨김</strong>: 자동으로 숨고, 방해 없음', fr: '<strong>Disparaît au blur</strong> : perd le focus → se cache, zéro encombrement', de: '<strong>Bei Fokusverlust</strong>: automatisch ausblenden, kein Müll', es: '<strong>Se oculta al perder foco</strong>: automático, sin desorden', pt: '<strong>Oculta ao perder foco</strong>: automático, sem bagunça' })"></li>
</ul>

<div class="cw-note-panel mt-4" data-tone="purple">
  <p class="cw-note-copy" v-html="$t({ en: '<strong>The minimum distance between idea and task.</strong>', zh: '<strong>想法与任务之间的最短距离。</strong>', ja: '<strong>アイデアとタスクの最短距離。</strong>', ko: '<strong>아이디어와 태스크 사이의 최단 거리.</strong>', fr: '<strong>La distance minimale entre une idée et une tâche.</strong>', de: '<strong>Der kürzeste Weg von der Idee zur Aufgabe.</strong>', es: '<strong>La distancia mínima entre una idea y una tarea.</strong>', pt: '<strong>A menor distância entre uma ideia e uma tarefa.</strong>' })"></p>
</div>

---

<div class="cw-grid"></div>
<div class="glow-orb glow-green cw-pulse" style="top:-100px; left:30%;"></div>
<div class="glow-orb glow-purple cw-pulse" style="bottom:-80px; right:20%;"></div>

<div class="cw-thanks-shell">
  <div class="mb-8">
    <img src="/images/clawwork-logo.png" class="cw-logo-md cw-float cw-logo-glow" alt="ClawWork" />
  </div>

  <h1 class="cw-display-title">
    <span class="cw-shimmer">{{ $t({ en: 'Thanks!', zh: '谢谢！', ja: 'ありがとう！', ko: '감사합니다!', fr: 'Merci !', de: 'Danke!', es: '¡Gracias!', pt: 'Obrigado!' }) }}</span>
  </h1>

  <p class="cw-thanks-copy">{{ $t({ en: 'Questions, ideas, or PRs. All welcome.', zh: '问题、想法、PR。都欢迎。', ja: '質問、アイデア、PR。すべて歓迎。', ko: '질문, 아이디어, PR. 모두 환영합니다.', fr: 'Questions, idées ou PR. Tout est bienvenu.', de: 'Fragen, Ideen oder PRs. Alles willkommen.', es: 'Preguntas, ideas o PRs. Todo bienvenido.', pt: 'Perguntas, ideias ou PRs. Tudo é bem-vindo.' }) }}</p>

  <div class="cw-final-links">
    <a href="https://github.com/clawwork-ai/ClawWork" target="_blank" class="cw-final-link">
      <GhIcon :size="20" />
      clawwork-ai/ClawWork
    </a>
    <a href="https://github.com/samzong" target="_blank" class="cw-final-link cw-final-link--muted">
      @samzong
    </a>
  </div>

  <div class="cw-final-note">
    {{ $t({ en: 'Apache 2.0 · macOS & Windows & Linux & PWA · Built with OpenClaw', zh: 'Apache 2.0 · macOS & Windows & Linux & PWA · 基于 OpenClaw 构建', ja: 'Apache 2.0 · macOS & Windows & Linux & PWA · OpenClaw で構築', ko: 'Apache 2.0 · macOS & Windows & Linux & PWA · OpenClaw 기반', fr: 'Apache 2.0 · macOS & Windows & Linux & PWA · Construit avec OpenClaw', de: 'Apache 2.0 · macOS & Windows & Linux & PWA · Gebaut mit OpenClaw', es: 'Apache 2.0 · macOS & Windows & Linux & PWA · Hecho con OpenClaw', pt: 'Apache 2.0 · macOS & Windows & Linux & PWA · Feito com OpenClaw' }) }}
  </div>
</div>
