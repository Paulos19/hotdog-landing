"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hotdog3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const currentContainer = containerRef.current;
    const width = currentContainer.clientWidth;
    const height = currentContainer.clientHeight;

    // Cena
    const scene = new THREE.Scene();

    // Câmera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 6.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentContainer.appendChild(renderer.domElement);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff1dc, 2.5);
    mainLight.position.set(4, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xf97316, 3, 10);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight(0xfacc15, 2, 8);
    warmLight.position.set(3, -1, 3);
    scene.add(warmLight);

    // GRUPO HOTDOG
    const hotdogGroup = new THREE.Group();
    scene.add(hotdogGroup);

    // Materiais
    const bunMaterial = new THREE.MeshStandardMaterial({
      color: 0xdf9b52,
      roughness: 0.55,
      metalness: 0.05,
    });

    const bottomBunMaterial = new THREE.MeshStandardMaterial({
      color: 0xcf8b42,
      roughness: 0.65,
    });

    const sausageMaterial = new THREE.MeshStandardMaterial({
      color: 0x9f2924,
      roughness: 0.35,
      metalness: 0.15,
    });

    const mustardMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.1,
    });

    const ketchupMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc1414,
      roughness: 0.15,
      metalness: 0.15,
    });

    const sesameMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.8,
    });

    // PÃO DE CIMA / LATERAL DIREITA
    const bunHalfGeom = new THREE.CapsuleGeometry(0.72, 3.2, 24, 24);
    const leftBun = new THREE.Mesh(bunHalfGeom, bunMaterial);
    leftBun.rotation.z = Math.PI / 2;
    leftBun.position.set(0, -0.2, 0.45);
    leftBun.scale.set(0.65, 1, 0.65);
    leftBun.castShadow = true;
    hotdogGroup.add(leftBun);

    // PÃO LATERAL ESQUERDA
    const rightBun = new THREE.Mesh(bunHalfGeom, bunMaterial);
    rightBun.rotation.z = Math.PI / 2;
    rightBun.position.set(0, -0.2, -0.45);
    rightBun.scale.set(0.65, 1, 0.65);
    rightBun.castShadow = true;
    hotdogGroup.add(rightBun);

    // BASE DO PÃO
    const baseBunGeom = new THREE.BoxGeometry(3.2, 0.4, 1.1);
    const baseBun = new THREE.Mesh(baseBunGeom, bottomBunMaterial);
    baseBun.position.set(0, -0.5, 0);
    hotdogGroup.add(baseBun);

    // SALSICHA ARTESANAL PREMIUM
    const sausageGeom = new THREE.CapsuleGeometry(0.48, 3.8, 32, 32);
    const sausage = new THREE.Mesh(sausageGeom, sausageMaterial);
    sausage.rotation.z = Math.PI / 2;
    sausage.position.set(0, 0.1, 0);
    sausage.castShadow = true;
    hotdogGroup.add(sausage);

    // GERGELIM NO PÃO
    for (let i = 0; i < 35; i++) {
      const sesameGeom = new THREE.SphereGeometry(0.035, 6, 6);
      sesameGeom.scale(1, 0.5, 1.8);
      const sesame = new THREE.Mesh(sesameGeom, sesameMaterial);
      const x = (Math.random() - 0.5) * 3.0;
      const z = Math.random() > 0.5 ? 0.65 + Math.random() * 0.15 : -0.65 - Math.random() * 0.15;
      const y = Math.random() * 0.3 - 0.1;
      sesame.position.set(x, y, z);
      sesame.rotation.set(Math.random(), Math.random(), Math.random());
      hotdogGroup.add(sesame);
    }

    // MOLHO MOSTARDA (Zigue-zague paramétrico)
    const mustardCurvePoints: THREE.Vector3[] = [];
    const mustardSegments = 16;
    for (let i = 0; i <= mustardSegments; i++) {
      const t = (i / mustardSegments) * 3.2 - 1.6;
      const offset = (i % 2 === 0 ? 0.22 : -0.22);
      mustardCurvePoints.push(new THREE.Vector3(t, 0.52 + Math.sin(i * 0.5) * 0.05, offset));
    }
    const mustardCurve = new THREE.CatmullRomCurve3(mustardCurvePoints);
    const mustardGeom = new THREE.TubeGeometry(mustardCurve, 64, 0.07, 8, false);
    const mustardMesh = new THREE.Mesh(mustardGeom, mustardMaterial);
    hotdogGroup.add(mustardMesh);

    // MOLHO KETCHUP ARTESANAL
    const ketchupCurvePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= mustardSegments; i++) {
      const t = (i / mustardSegments) * 3.2 - 1.6;
      const offset = (i % 2 === 0 ? -0.2 : 0.2);
      ketchupCurvePoints.push(new THREE.Vector3(t, 0.58 + Math.cos(i * 0.6) * 0.04, offset));
    }
    const ketchupCurve = new THREE.CatmullRomCurve3(ketchupCurvePoints);
    const ketchupGeom = new THREE.TubeGeometry(ketchupCurve, 64, 0.065, 8, false);
    const ketchupMesh = new THREE.Mesh(ketchupGeom, ketchupMaterial);
    hotdogGroup.add(ketchupMesh);

    // EFEITO DE PARTÍCULAS DE TEMPERO / ERVAS FLUTUANDO AO REDOR
    const particleCount = 45;
    const particleGeometry = new THREE.DodecahedronGeometry(0.045, 0);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      roughness: 0.3,
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeometry, particleMaterial);
      p.position.set(
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 4
      );
      scene.add(p);
      particles.push(p);
    }

    // Interatividade com o mouse
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0.4;
    let targetRotationX = 0.3;

    const onMouseMove = (e: MouseEvent) => {
      const rect = currentContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Loop de Animação
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotação suave contínua + mouse
      targetRotationY = 0.35 + mouseX * 0.7;
      targetRotationX = 0.25 - mouseY * 0.5;

      hotdogGroup.rotation.y += (targetRotationY - hotdogGroup.rotation.y) * 0.05;
      hotdogGroup.rotation.x += (targetRotationX - hotdogGroup.rotation.x) * 0.05;
      hotdogGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.08;

      // Flutuação vertical (levitação suave)
      hotdogGroup.position.y = Math.sin(elapsedTime * 2) * 0.15;

      // Animação das partículas
      particles.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.003;
        p.rotation.x += 0.01;
        p.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentContainer) return;
      const w = currentContainer.clientWidth;
      const h = currentContainer.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-amber-300 pointer-events-none select-none flex items-center gap-1.5 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        Modelo 3D Interativo • Mova o cursor
      </div>
    </div>
  );
}
