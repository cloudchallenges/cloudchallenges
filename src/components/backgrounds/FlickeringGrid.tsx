"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
    squareSize?: number;
    gridGap?: number;
    flickerChance?: number;
    color?: string;
    width?: number;
    height?: number;
    className?: string;
    maxOpacity?: number;
}

export function FlickeringGrid({
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.3,
    color = "rgb(0, 0, 0)",
    width,
    height,
    className,
    maxOpacity = 0.3,
}: FlickeringGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Parse color to RGB
    const memoizedColor = useMemo(() => {
        const toRGBA = (color: string) => {
            if (typeof window === "undefined") {
                return `rgba(0, 0, 0,`;
            }
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1;
            const ctx = canvas.getContext("2d");
            if (!ctx) return "rgba(255, 0, 0,";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            return `rgba(${r}, ${g}, ${b},`;
        };
        return toRGBA(color);
    }, [color]);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Setup Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Setup ResizeObserver
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setCanvasSize({
                    width: width || rect.width,
                    height: height || rect.height,
                });
            }
        };

        updateSize();

        const resizeObserver = new ResizeObserver(updateSize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [width, height]);

    // Animation
    const setupCanvas = useCallback(
        (canvas: HTMLCanvasElement, width: number, height: number) => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const cols = Math.floor(width / (squareSize + gridGap));
            const rows = Math.floor(height / (squareSize + gridGap));

            const squares = new Float32Array(cols * rows);
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random() * maxOpacity;
            }

            return { cols, rows, squares, dpr };
        },
        [squareSize, gridGap, maxOpacity]
    );

    const updateSquares = useCallback(
        (squares: Float32Array, deltaTime: number) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * deltaTime) {
                    squares[i] = Math.random() * maxOpacity;
                }
            }
        },
        [flickerChance, maxOpacity]
    );

    const drawGrid = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            cols: number,
            rows: number,
            squares: Float32Array,
            dpr: number
        ) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = memoizedColor;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const opacity = squares[i * rows + j];
                    ctx.fillStyle = `${memoizedColor}${opacity})`;
                    ctx.fillRect(
                        i * (squareSize + gridGap) * dpr,
                        j * (squareSize + gridGap) * dpr,
                        squareSize * dpr,
                        squareSize * dpr
                    );
                }
            }
        },
        [memoizedColor, squareSize, gridGap]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || canvasSize.width === 0 || canvasSize.height === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { cols, rows, squares, dpr } = setupCanvas(
            canvas,
            canvasSize.width,
            canvasSize.height
        );

        // If user prefers reduced motion, draw static grid
        if (prefersReducedMotion) {
            drawGrid(ctx, canvas.width, canvas.height, cols, rows, squares, dpr);
            return;
        }

        let animationFrameId: number;
        let lastTime = performance.now();

        const animate = (time: number) => {
            if (!isInView) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            updateSquares(squares, deltaTime);
            drawGrid(ctx, canvas.width, canvas.height, cols, rows, squares, dpr);

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [
        canvasSize,
        setupCanvas,
        updateSquares,
        drawGrid,
        isInView,
        prefersReducedMotion,
    ]);

    return (
        <div
            ref={containerRef}
            className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
        >
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    );
}
