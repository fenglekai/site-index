import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FocusShader } from "three/examples/jsm/shaders/FocusShader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
// 星空
class StarrySky {
  domElement: Element;
  constructor(domElement: Element) {
    this.domElement = domElement;
  }

  init() {
    try {
      const containerWidth = this.domElement.clientWidth;
      const containerHeight =
        this.domElement.clientHeight || window.innerHeight;

      THREE.ColorManagement.enabled = false;
      const clock = new THREE.Clock();
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerWidth, containerHeight);
      this.domElement.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        containerWidth / containerHeight,
        0.1,
        2000
      );

      scene.add(new THREE.AmbientLight(0x404040));

      const pointLight = new THREE.PointLight(0xffffff, 1);
      camera.add(pointLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableZoom = true;
      controls.enableDamping = true;
      controls.autoRotate = true;

      camera.position.set(1.2, 0.5, 0.5);

      const params = {
        exposure: 0,
        bloomStrength: 4,
        bloomThreshold: 0,
        bloomRadius: 1,
      };
      const renderScene = new RenderPass(scene, camera);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(containerWidth, containerHeight),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = params.bloomThreshold;
      bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;

      const effectFocus = new ShaderPass(FocusShader);

      effectFocus.uniforms["screenWidth"].value =
        containerWidth * window.devicePixelRatio;
      effectFocus.uniforms["screenHeight"].value =
        containerHeight * window.devicePixelRatio;

      const composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);

      const loader = new GLTFLoader();
      const box = new THREE.Box3();
      loader.load(
        "/gltf/need_some_space.glb",
        function (gltf) {
          const model: any = gltf.scene;
          // 利用box定位中心点
          box.setFromObject(model);
          let mdLen = box.max.x - box.min.x;
          let mdWid = box.max.z - box.min.z;
          let mdHei = box.max.y - box.min.y;
          let xl = box.min.x + mdLen / 2;
          let yl = box.min.y + mdHei / 2;
          let zl = box.min.z + mdWid / 2;
          model.position.set(-xl, -yl, -zl);
          model.position.set(-xl, -yl, -zl);

          const points: any = gltf.scene.children[0].children[0].children[0];

          const light = new THREE.AmbientLight(0x404040);
          scene.add(light);

          points.geometry.computeVertexNormals();
          points.material.size = 0.003;
          points.material.sizeAttenuation = true;
          points.material.map = new THREE.TextureLoader().load(
            "/textures/disc.png"
          );
          points.material.transparent = true;
          points.material.alphaTest = 0;
          scene.add(model);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      function animate() {
        requestAnimationFrame(animate);

        controls.update();

        composer.render();
      }

      scene.scale.set(0, 0, 0);
      let scale = 0;
      const timer = setInterval(() => {
        if (scale > 1) {
          clearInterval(timer);
        }
        scale += 0.005;
        scene.scale.set(scale, scale, scale);
      }, 1);
      animate();
      // 监听画面变化，更新渲染画面
      window.addEventListener("resize", () => {
        // 更新摄像头
        camera.aspect = containerWidth / containerHeight;
        //   更新摄像机的投影矩阵
        camera.updateProjectionMatrix();

        camera.lookAt(scene.position);

        renderer.setSize(containerWidth, containerHeight);
        composer.setSize(containerWidth, containerHeight);

        effectFocus.uniforms["screenWidth"].value =
          containerWidth * window.devicePixelRatio;
        effectFocus.uniforms["screenHeight"].value =
          containerHeight * window.devicePixelRatio;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
// 雕像
class Spotlight {
  domElement: Element;
  constructor(domElement: Element) {
    this.domElement = domElement;
  }

  init() {
    try {
      THREE.ColorManagement.enabled = false; // TODO: Consider enabling color management.

      let renderer: any, scene: any, camera: any;

      let spotLight: any, lightHelper: any;
      const container = this.domElement;
      init();

      function init() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;

        renderer.setAnimationLoop(render);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        camera.position.set(70, 50, 10);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 20;
        controls.maxDistance = 100;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(0, 18, 0);
        controls.update();

        const ambient = new THREE.HemisphereLight(0xffffff, 0x444444, 0.05);
        scene.add(ambient);

        const loader = new THREE.TextureLoader().setPath("textures/");
        const filenames = ["disturb.jpg", "colors.png", "uv_grid_opengl.jpg"];

        const textures: any = { none: null };

        for (let i = 0; i < filenames.length; i++) {
          const filename = filenames[i];

          const texture: any = loader.load(filename);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.colorSpace = THREE.SRGBColorSpace;

          textures[filename] = texture;
        }

        spotLight = new THREE.SpotLight(0xffffff, 5);
        spotLight.position.set(25, 50, 25);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 1;
        spotLight.decay = 2;
        spotLight.distance = 100;
        spotLight.map = textures["disturb.jpg"];

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 200;
        spotLight.shadow.focus = 1;
        scene.add(spotLight);

        lightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(lightHelper);

        //

        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const material = new THREE.MeshLambertMaterial({ color: 0x808080 });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -1, 0);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);

        //

        new PLYLoader().load("ply/Lucy100k.ply", function (geometry) {
          geometry.scale(0.024, 0.024, 0.024);
          geometry.computeVertexNormals();

          const material = new THREE.MeshLambertMaterial();

          const mesh = new THREE.Mesh(geometry, material);
          mesh.rotation.y = -Math.PI / 2;
          mesh.position.y = 18;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          scene.add(mesh);
        });

        window.addEventListener("resize", onWindowResize);

        // GUI
        const gui = new GUI();

        const params = {
          map: textures["disturb.jpg"],
          color: spotLight.color.getHex(),
          intensity: spotLight.intensity,
          distance: spotLight.distance,
          angle: spotLight.angle,
          penumbra: spotLight.penumbra,
          decay: spotLight.decay,
          focus: spotLight.shadow.focus,
          shadows: true,
        };

        gui.add(params, "map", textures).onChange(function (val: any) {
          spotLight.map = val;
        });

        gui.addColor(params, "color").onChange(function (val: any) {
          spotLight.color.setHex(val);
        });

        gui.add(params, "intensity", 0, 10).onChange(function (val: any) {
          spotLight.intensity = val;
        });

        gui.add(params, "distance", 50, 200).onChange(function (val: any) {
          spotLight.distance = val;
        });

        gui.add(params, "angle", 0, Math.PI / 3).onChange(function (val: any) {
          spotLight.angle = val;
        });

        gui.add(params, "penumbra", 0, 1).onChange(function (val: any) {
          spotLight.penumbra = val;
        });

        gui.add(params, "decay", 1, 2).onChange(function (val: any) {
          spotLight.decay = val;
        });

        gui.add(params, "focus", 0, 1).onChange(function (val: any) {
          spotLight.shadow.focus = val;
        });

        gui.add(params, "shadows").onChange(function (val: any) {
          renderer.shadowMap.enabled = val;

          scene.traverse(function (child: any) {
            if (child.material) {
              child.material.needsUpdate = true;
            }
          });
        });

        gui.open();
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function render() {
        const time = performance.now() / 3000;

        spotLight.position.x = Math.cos(time) * 25;
        spotLight.position.z = Math.sin(time) * 25;

        lightHelper.update();

        renderer.render(scene, camera);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// 头盔
class LoaderGLTF {
  domElement: Element;
  constructor(domElement: Element) {
    this.domElement = domElement;
  }

  init() {
    try {
      let camera: any, scene: any, renderer: any;

      const container = this.domElement;
      init();
      render();

      function init() {
        document.body.appendChild(container);

        camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.25,
          20
        );
        camera.position.set(-1.8, 0.6, 2.7);

        scene = new THREE.Scene();

        new RGBELoader()
          .setPath("textures/")
          .load("royal_esplanade_1k.hdr", function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;

            render();

            // model

            const loader = new GLTFLoader().setPath("gltf/DamagedHelmet/glTF/");
            loader.load("DamagedHelmet.gltf", function (gltf) {
              scene.add(gltf.scene);

              render();
            });
          });

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener("change", render); // use if there is no animation loop
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.target.set(0, 0, -0.2);
        controls.update();

        window.addEventListener("resize", onWindowResize);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        render();
      }

      //

      function render() {
        renderer.render(scene, camera);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// 第一视角全景图
class PanoramaCube {
  domElement: Element;
  constructor(domElement: Element) {
    this.domElement = domElement;
  }

  init() {
    try {
      let camera: any, controls: any;
      let renderer: any;
      let scene: any;

      const container = this.domElement;
      init();
      animate();

      function init() {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          90,
          window.innerWidth / window.innerHeight,
          0.1,
          100
        );
        camera.position.z = 0.01;

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.rotateSpeed = -0.25;

        const textures = getTexturesFromAtlasFile(
          "textures/sun_temple_stripe.jpg",
          6
        );

        const materials = [];

        for (let i = 0; i < 6; i++) {
          materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
        }

        const skyBox = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          materials
        );
        skyBox.geometry.scale(1, 1, -1);
        scene.add(skyBox);

        window.addEventListener("resize", onWindowResize);
      }

      function getTexturesFromAtlasFile(atlasImgUrl: any, tilesNum: any) {
        const textures: any = [];

        for (let i = 0; i < tilesNum; i++) {
          textures[i] = new THREE.Texture();
        }

        new THREE.ImageLoader().load(atlasImgUrl, (image) => {
          let canvas, context;
          const tileWidth = image.height;

          for (let i = 0; i < textures.length; i++) {
            canvas = document.createElement("canvas");
            context = canvas.getContext("2d");
            canvas.height = tileWidth;
            canvas.width = tileWidth;
            context?.drawImage(
              image,
              tileWidth * i,
              0,
              tileWidth,
              tileWidth,
              0,
              0,
              tileWidth,
              tileWidth
            );
            textures[i].colorSpace = THREE.SRGBColorSpace;
            textures[i].image = canvas;
            textures[i].needsUpdate = true;
          }
        });

        return textures;
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);

        controls.update(); // required when damping is enabled

        renderer.render(scene, camera);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// 视频播放
class PanoramaEquirectangular {
  domElement: Element;
  constructor(domElement: Element) {
    this.domElement = domElement;
  }

  init() {
    try {
      let camera: any, scene: any, renderer: any;

      let isUserInteracting = false,
        lon = 0,
        lat = 0,
        phi = 0,
        theta = 0,
        onPointerDownPointerX = 0,
        onPointerDownPointerY = 0,
        onPointerDownLon = 0,
        onPointerDownLat = 0;

      const distance = 50;

      const container = this.domElement;
      init();
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          1,
          1100
        );

        scene = new THREE.Scene();

        const geometry = new THREE.SphereGeometry(500, 60, 40);
        // invert the geometry on the x-axis so that all of the faces point inward
        geometry.scale(-1, 1, 1);

        const videoElement = document.createElement("video");
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.crossOrigin = "anonymous";
        videoElement.style.display = "none";
        const sourceElement = document.createElement("source");
        sourceElement.src = "textures/pano.webm";
        const sourceElement2 = document.createElement("source");
        sourceElement2.src = "textures/pano.mp4";
        videoElement.appendChild(sourceElement);
        videoElement.appendChild(sourceElement2);

        const video: any = container.appendChild(videoElement);
        video.play();

        const texture: any = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);

        //

        window.addEventListener("resize", onWindowResize);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onPointerDown(event: any) {
        isUserInteracting = true;

        onPointerDownPointerX = event.clientX;
        onPointerDownPointerY = event.clientY;

        onPointerDownLon = lon;
        onPointerDownLat = lat;
      }

      function onPointerMove(event: any) {
        if (isUserInteracting === true) {
          lon =
            (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
          lat =
            (onPointerDownPointerY - event.clientY) * 0.1 + onPointerDownLat;
        }
      }

      function onPointerUp() {
        isUserInteracting = false;
      }

      function animate() {
        requestAnimationFrame(animate);
        update();
      }

      function update() {
        lat = Math.max(-85, Math.min(85, lat));
        phi = THREE.MathUtils.degToRad(90 - lat);
        theta = THREE.MathUtils.degToRad(lon);

        camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
        camera.position.y = distance * Math.cos(phi);
        camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// 动态模型
class UnrealBloom {
  domElement: Element;
  constructor(domElement: Element) {
    this.domElement = domElement;
  }

  init() {
    try {
      THREE.ColorManagement.enabled = false; // TODO: Confirm correct color management.

      let camera: any, stats: any;
      let composer: any, renderer: any, mixer: any, clock: any;

      const params = {
        exposure: 1,
        bloomStrength: 1.5,
        bloomThreshold: 0,
        bloomRadius: 0,
      };

      const container = this.domElement;
      init();

      function init() {
        stats = new Stats();
        container.appendChild(stats.dom);

        clock = new THREE.Clock();

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          1,
          100
        );
        camera.position.set(-5, 2.5, -3.5);
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 1;
        controls.maxDistance = 10;

        scene.add(new THREE.AmbientLight(0x404040));

        const pointLight = new THREE.PointLight(0xffffff, 1);
        camera.add(pointLight);

        const renderScene = new RenderPass(scene, camera);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          1.5,
          0.4,
          0.85
        );
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;

        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        new GLTFLoader().load("gltf/PrimaryIonDrive.glb", function (gltf) {
          const model = gltf.scene;

          scene.add(model);

          mixer = new THREE.AnimationMixer(model);
          const clip = gltf.animations[0];
          mixer.clipAction(clip.optimize()).play();

          animate();
        });

        const gui = new GUI();

        gui.add(params, "exposure", 0.1, 2).onChange(function (value: any) {
          renderer.toneMappingExposure = Math.pow(value, 4.0);
        });

        gui
          .add(params, "bloomThreshold", 0.0, 1.0)
          .onChange(function (value: any) {
            bloomPass.threshold = Number(value);
          });

        gui
          .add(params, "bloomStrength", 0.0, 3.0)
          .onChange(function (value: any) {
            bloomPass.strength = Number(value);
          });

        gui
          .add(params, "bloomRadius", 0.0, 1.0)
          .step(0.01)
          .onChange(function (value: any) {
            bloomPass.radius = Number(value);
          });

        window.addEventListener("resize", onWindowResize);
      }

      function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        composer.setSize(width, height);
      }

      function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        mixer.update(delta);

        stats.update();

        composer.render();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export {
  StarrySky,
  Spotlight,
  LoaderGLTF,
  PanoramaCube,
  PanoramaEquirectangular,
  UnrealBloom,
};
